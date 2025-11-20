const logger = require('../utils/logger.js');
const { formatResponse } = require('../utils/helpers.js');
const { HTTP_STATUS } = require('../utils/constants.js');

exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error('Middleware Error:', err);

  
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = formatResponse(
      false, 
      null, 
      message, 
      HTTP_STATUS.NOT_FOUND
    );
  }


  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = formatResponse(
      false, 
      null, 
      message, 
      HTTP_STATUS.CONFLICT
    );
  }

  
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = formatResponse(
      false, 
      null, 
      message, 
      HTTP_STATUS.BAD_REQUEST
    );
  }

  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
    formatResponse(
      false,
      null,
      error.message || 'Server Error',
      error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
    )
  );
};
