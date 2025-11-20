import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import EventStats from '../events/EventStats.js';
import EventList from '../events/EventList.js';
import EventForm from '../events/EventForm.js';
import Button from '../ui/Button.js';
import { useEvent } from '../../context/EventContext.js';

const Dashboard = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const {
    events,
    stats,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    setFilters,
    filters,
    refetch
  } = useEvent();

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent(eventData);
      setShowEventForm(false);
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      await updateEvent(editingEvent._id, eventData);
      setEditingEvent(null);
    } catch (err) {
      console.error('Failed to update event:', err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
      } catch (err) {
        console.error('Failed to delete event:', err);
      }
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ [filterType]: value });
  };

  const handleRefreshEvents = () => {
    refetch(); 
  };

  const filterOptions = [
    { key: '', label: 'All Events' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'completed', label: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your events and reminders</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleRefreshEvents}
              loading={loading}
            >
              <RefreshCw size={20} className="mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => setShowEventForm(true)}
            >
              <Plus size={20} className="mr-2" />
              New Event
            </Button>
          </div>
        </motion.div>

       
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

       
        {stats && <EventStats stats={stats} />}

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-4 mb-6 overflow-x-auto pb-2"
        >
          {filterOptions.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange('status', filter.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filters.status === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        
        <EventList
          events={events}
          loading={loading}
          onEdit={setEditingEvent}
          onDelete={handleDeleteEvent}
        />

        
        <EventForm
          isOpen={showEventForm || !!editingEvent}
          onClose={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          event={editingEvent}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
