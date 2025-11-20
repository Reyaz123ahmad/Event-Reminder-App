exports.info = (message, meta = {}) => {
  console.log(JSON.stringify({
    level: 'INFO',
    timestamp: new Date().toISOString(),
    message,
    ...meta
  }));
};

exports.error = (message, error = null) => {
  console.error(JSON.stringify({
    level: 'ERROR',
    timestamp: new Date().toISOString(),
    message,
    error: error ? error.message : null
  }));
};
