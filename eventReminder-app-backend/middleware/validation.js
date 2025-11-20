const { formatResponse } = require('../utils/helpers.js');
const { HTTP_STATUS } = require('../utils/constants.js');

exports.validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        formatResponse(
          false, 
          null, 
          error.details[0].message, 
          HTTP_STATUS.BAD_REQUEST
        )
      );
    }
    
    next();
  };
};

exports.validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        formatResponse(
          false, 
          null, 
          error.details[0].message, 
          HTTP_STATUS.BAD_REQUEST
        )
      );
    }
    
    next();
  };
};

exports.validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);
    
    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        formatResponse(
          false, 
          null, 
          error.details[0].message, 
          HTTP_STATUS.BAD_REQUEST
        )
      );
    }
    
    next();
  };
};
