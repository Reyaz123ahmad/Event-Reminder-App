const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { formatResponse, sanitizeUser } = require('../utils/helpers.js');
const { HTTP_STATUS, JWT_EXPIRES_IN, BCRYPT_SALT_ROUNDS } = require('../utils/constants.js');
const logger = require('../utils/logger.js');

exports.signup = async (userData) => {
  try {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return formatResponse(
        false, 
        null, 
        'User with this email already exists', 
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = exports.generateToken(user._id);

    return formatResponse(
      true,
      {
        token,
        user: sanitizeUser(user)
      },
      'User registered successfully',
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    logger.error('Signup service error:', error);
    throw error;
  }
};

exports.login = async (credentials) => {
  try {
    const { email, password } = credentials;

    const user = await User.findOne({ email });
    if (!user) {
      return formatResponse(
        false,
        null,
        'Invalid email or password',
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return formatResponse(
        false,
        null,
        'Invalid email or password',
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const token = exports.generateToken(user._id);

    return formatResponse(
      true,
      {
        token,
        user: sanitizeUser(user)
      },
      'Login successful',
      HTTP_STATUS.OK
    );
  } catch (error) {
    logger.error('Login service error:', error);
    throw error;
  }
};

exports.getCurrentUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return formatResponse(
        false,
        null,
        'User not found',
        HTTP_STATUS.NOT_FOUND
      );
    }

    return formatResponse(
      true,
      { user: sanitizeUser(user) },
      'User retrieved successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    logger.error('Get current user service error:', error);
    throw error;
  }
};

exports.generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};
