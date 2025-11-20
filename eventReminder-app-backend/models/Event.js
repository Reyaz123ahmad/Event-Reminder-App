const mongoose = require('mongoose');
const { EVENT_STATUS } = require('../utils/constants.js');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Event title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  image: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: Object.values(EVENT_STATUS),
    default: EVENT_STATUS.UPCOMING
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Event must belong to a user']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

eventSchema.index(
  { user: 1, date: 1 }
);

eventSchema.index(
  { user: 1, status: 1 }
);

eventSchema.index(
  { date: 1 }
);

eventSchema.index(
  { user: 1, title: 1, date: 1, location: 1 },
  { unique: true }
);


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;   
