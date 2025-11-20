const eventService = require('../services/eventService.js');

exports.createEvent = async (req, res, next) => {
  try {
    const result = await eventService.createEvent(
      req.body,
      req.user._id,
      req.files?.image
    );
    

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const result = await eventService.getEvents(
      req.user._id, 
      req.query
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getEvent = async (req, res, next) => {
  try {
    const result = await eventService.getEventById(
      req.params.id,
      req.user._id
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const result = await eventService.updateEvent(
      req.params.id,
      req.user._id,
      req.body,
      req.files?.image
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const result = await eventService.deleteEvent(
      req.params.id,
      req.user._id
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const result = await eventService.getEventStats(
      req.user._id
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingEvents = async (req, res, next) => {
  try {
    const result = await eventService.getUpcomingEvents(
      req.user._id
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
