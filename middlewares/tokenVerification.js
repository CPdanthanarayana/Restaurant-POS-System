const createHttpError = require("http-errors");

const config = require("../config/config");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      const error = createHttpError(401, "Please provide Token!");
      return next(error);
    }

    const decodeToken = jsonwebtoken.verify(
      accessToken,
      config.accessTokenSecret
    );

    const user = await User.findById(decodeToken._id);
    if (!user) {
      const error = createHttpError(401, "User not exist!");
    }

    req.user = user;
    next();
  } catch (error) {
    const err = createHttpError(401, "Invalid Token!");
    next(err);
  }
};

module.exports = { isVerifiedUser };
