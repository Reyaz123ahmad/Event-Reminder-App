import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trash2, Edit, CheckCircle } from 'lucide-react';
import { formatDate, getTimeRemaining } from '../../utils/helpers.js';
import { EVENT_STATUS, DEFAULT_EVENT_IMAGE } from '../../utils/constants.js';

const EventCard = ({ event, onEdit, onDelete }) => {
  const isUpcoming = event.status === EVENT_STATUS.UPCOMING;
  const isCompleted = event.status === EVENT_STATUS.COMPLETED;

  
  const now = new Date();
  const eventDate = new Date(event.date);
  const isActuallyCompleted = eventDate < now;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={event.image || DEFAULT_EVENT_IMAGE}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${
              isUpcoming && !isActuallyCompleted
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {isUpcoming && !isActuallyCompleted ? (
              <>
                <Clock size={14} />
                <span>Upcoming</span>
              </>
            ) : (
              <>
                <CheckCircle size={14} />
                <span>Completed</span>
              </>
            )}
          </span>
        </div>

        
        {isActuallyCompleted && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg px-4 py-2 flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-green-800 font-semibold">Event Completed</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>

          {event.location && (
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          )}

          {isUpcoming && !isActuallyCompleted && (
            <div className="flex items-center text-blue-600 font-medium">
              <Clock size={16} className="mr-2" />
              <span className="text-sm">{getTimeRemaining(event.date)}</span>
            </div>
          )}

          {isActuallyCompleted && (
            <div className="flex items-center text-green-600 font-medium">
              <CheckCircle size={16} className="mr-2" />
              <span className="text-sm">Event completed</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {event.category && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {event.category}
            </span>
          )}

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(event)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(event._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
