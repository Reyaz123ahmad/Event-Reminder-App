const { EVENT_STATUS } = require('./constants.js');

exports.formatResponse = (success, data = null, message = '', statusCode = 200) => {
  return {
    success,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};


exports.calculateEventStatus = (eventDate) => {
  const now = new Date();
  return eventDate.getTime() < now.getTime() ? EVENT_STATUS.COMPLETED : EVENT_STATUS.UPCOMING;
};

exports.sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  const { password, __v, ...sanitized } = userObj;
  return sanitized;
};
