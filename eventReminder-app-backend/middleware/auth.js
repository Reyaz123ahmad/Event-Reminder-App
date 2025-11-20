const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { formatResponse } = require('../utils/helpers.js');
const { HTTP_STATUS } = require('../utils/constants.js');
const logger = require('../utils/logger.js');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(
        formatResponse(
          false, 
          null, 
          'Access denied. No token provided.', 
          HTTP_STATUS.UNAUTHORIZED
        )
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(
        formatResponse(
          false, 
          null, 
          'Invalid token.', 
          HTTP_STATUS.UNAUTHORIZED
        )
      );
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(
        formatResponse(
          false, 
          null, 
          'Invalid token.', 
          HTTP_STATUS.UNAUTHORIZED
        )
      );
    }
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      formatResponse(
        false, 
        null, 
        'Authentication failed.', 
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    );
  }
};
