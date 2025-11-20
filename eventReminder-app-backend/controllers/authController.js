const authService = require('../services/authService.js');

exports.signup = async (req, res, next) => {
  try {
    const result = await authService.signup(
      req.body
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(
      req.body
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const result = await authService.getCurrentUser(
      req.user._id
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
