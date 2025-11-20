import { useState, useEffect, useCallback } from 'react';
import { eventsAPI } from '../services/events.js';

export const useEvents = (filters = {}) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchEvents = useCallback(async (newFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await eventsAPI.getEvents({
        ...filters, 
        ...newFilters 
      });
      if (result.success) {
        setEvents(result.data.events);
        setPagination(result.data.pagination || {});
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createEvent = async (eventData) => {
    try {
      const result = await eventsAPI.createEvent(eventData);
      if (result.success) {
        await fetchEvents();
        return result;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create event');
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      const result = await eventsAPI.updateEvent(id, eventData);
      if (result.success) {
        await fetchEvents();
        return result;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update event');
    }
  };

  const deleteEvent = async (id) => {
    try {
      const result = await eventsAPI.deleteEvent(id);
      if (result.success) {
        await fetchEvents();
        return result;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete event');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    pagination,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents
  };
};
