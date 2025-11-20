const Event = require('../models/Event.js');
const { formatResponse, calculateEventStatus } = require('../utils/helpers.js');
const { HTTP_STATUS, EVENT_STATUS } = require('../utils/constants.js');
const logger = require('../utils/logger.js');
const { uploadImageToCloudinary } = require('../utils/imageUploader.js');

exports.createEvent = async (eventData, userId, file) => {
  try {
    const { title, description, date, location, category } = eventData;
    
    const eventDate = new Date(date);
    const status = calculateEventStatus(eventDate);
    let imageUrl = eventData.image || null;

    if (file) {
      const uploadResponse = await uploadImageToCloudinary(file, "events");
      imageUrl = uploadResponse.secure_url;
    }

    const event = await Event.create({
      title,
      description,
      date: eventDate,
      image: imageUrl,
      location,
      category,
      status,
      user: userId
    });

    return formatResponse(
      true,
      { event },
      'Event created successfully',
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    if (error.code === 11000) {
      return formatResponse(
        false,
        null,
        "Duplicate Event is not allowed",
        HTTP_STATUS.CONFLICT
      );
    }
    logger.error('Create Event Service Error', error);
    throw error;
  }
};


exports.updateEventStatus = async () => {
  try {
    const now = new Date();
    const result = await Event.updateMany(
      { date: { $lte: now }, status: EVENT_STATUS.UPCOMING },
      { status: EVENT_STATUS.COMPLETED }
    );
    logger.info(`Updated ${result.modifiedCount} events to completed status`);
    return result;
  } catch (error) {
    logger.error('Update event status service error:', error);
    throw error;
  }
};

exports.getEvents = async (userId, filters = {}) => {
  try {
    
    await exports.updateEventStatus();

    const { status, page = 1, limit = 10, search } = filters;
    const query = { user: userId };

    if (status && Object.values(EVENT_STATUS).includes(status)) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(query);

    return formatResponse(
      true,
      {
        events,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      },
      'Events retrieved successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    logger.error('Get events service error:', error);
    throw error;
  }
};

exports.getEventById = async (eventId, userId) => {
  try {
    const event = await Event.findOne({ 
      _id: eventId, 
      user: userId 
    });
    if (!event) {
      return formatResponse(
        false, 
        null, 
        'Event not found', 
        HTTP_STATUS.NOT_FOUND
      );
    }
    return formatResponse(true, { event }, 'Event retrieved successfully', HTTP_STATUS.OK);
  } catch (error) {
    logger.error('Get event by ID service error:', error);
    throw error;
  }
};

exports.updateEvent = async (eventId, userId, updateData, file) => {
  try {
    const event = await Event.findOne({ 
      _id: eventId, 
      user: userId 
    });
    if (!event) {
      return formatResponse(
        false, 
        null, 
        'Event not found', 
        HTTP_STATUS.NOT_FOUND
      );
    }

    const eventDate = new Date(updateData.date || event.date);
    updateData.status = calculateEventStatus(eventDate);

    if (file) {
      const uploadResponse = await uploadImageToCloudinary(file, "events");
      updateData.image = uploadResponse.secure_url;
    }

    Object.assign(event, updateData);
    await event.save();

    return formatResponse(true, { event }, 'Event updated successfully', HTTP_STATUS.OK);
  } catch (error) {
    logger.error('Update event service error:', error);
    throw error;
  }
};

exports.deleteEvent = async (eventId, userId) => {
  try {
    const event = await Event.findOneAndDelete({ 
      _id: eventId, 
      user: userId 
    });
    if (!event) {
      return formatResponse(false, null, 'Event not found', HTTP_STATUS.NOT_FOUND);
    }
    return formatResponse(true, null, 'Event deleted successfully', HTTP_STATUS.OK);
  } catch (error) {
    logger.error('Delete event service error:', error);
    throw error;
  }
};

exports.getEventStats = async (userId) => {
  try {
    const totalEvents = await Event.countDocuments({ 
      user: userId 
    });

    const activeEvents = await Event.countDocuments({ 
      user: userId, 
      status: EVENT_STATUS.UPCOMING 
    });

    const completedEvents = await Event.countDocuments({ 
      user: userId, 
      status: EVENT_STATUS.COMPLETED 
    });

    return formatResponse(
      true,
      { totalEvents, activeEvents, completedEvents },
      'Statistics retrieved successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    logger.error('Get event stats service error:', error);
    throw error;
  }
};

exports.getUpcomingEvents = async (userId, limit = 5) => {
  try {
    
    await exports.updateEventStatus();

    const events = await Event.find({
      user: userId,
      status: EVENT_STATUS.UPCOMING,
      date: { $gte: new Date() }
    })
    .sort({ date: 1 })
    .limit(limit);

    return formatResponse(true, { events }, 'Upcoming events retrieved successfully', HTTP_STATUS.OK);
  } catch (error) {
    logger.error('Get upcoming events service error:', error);
    throw error;
  }
};
