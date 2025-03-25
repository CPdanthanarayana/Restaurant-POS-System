const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const config = require("../config/config");

// Registration
const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;
    if (!name || !phone || !email || !password || !role) {
      const error = createHttpError(400, "All field are required");
      return next(error);
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      const error = createHttpError(400, "User already exist 🙋🏿‍♂️!");
      return next(error);
    }

    const user = { name, phone, email, password, role };
    const newUser = User(user);
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "New user created!", data: newUser });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = createHttpError(400, "All field are rquired!");
      return next(error);
    }
    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      const error = createHttpError(401, "Invalid eCredentials");
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, isUserPresent.password);
    if (!isMatch) {
      const error = createHttpError(401, "Invalid pCredentials");
      return next(error);
    }

    const accessToken = jsonwebtoken.sign(
      { _id: isUserPresent._id },
      config.accessTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "User Login Successfully!",
      data: isUserPresent,
    });
  } catch (error) {
    next(error);
  }
};


// Get User Data
const getUserData = async (req, res, next) => {

}


module.exports = { register, login, getUserData };
