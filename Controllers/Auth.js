const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  const { name, email, password, contactNo, profession } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      let error = new Error("Email id already exists ");
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      contactNo: contactNo,
      profession: profession,
    });
    const userCreated = await user.save();
    console.log(userCreated);
    return res
      .status(201)
      .json({ message: "user created successfully", user: userCreated });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      let error = new Error("Email id does not exist  ");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      let error = new Error("Email id or password is incorrect ");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "somesupersecretsecretkey",
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "Login successfull", token: token, user: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
