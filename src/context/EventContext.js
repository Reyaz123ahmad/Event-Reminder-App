import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { eventsAPI } from '../services/events.js';
import { useAuth } from '../hooks/useAuth.js';


const EVENT_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_EVENTS: 'SET_EVENTS',
  SET_ERROR: 'SET_ERROR',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  SET_STATS: 'SET_STATS',
  SET_FILTER: 'SET_FILTER'
};

const initialState = {
  events: [],
  stats: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    search: '',
    page: 1,
    limit: 10
  },
  pagination: {}
};


const eventReducer = (state, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case EVENT_ACTIONS.SET_EVENTS:
      return {
        ...state,
        events: action.payload.events,
        pagination: action.payload.pagination || {},
        loading: false,
        error: null
      };

    case EVENT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case EVENT_ACTIONS.ADD_EVENT:
      return { ...state, events: [action.payload, ...state.events], error: null };

    case EVENT_ACTIONS.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(ev =>
          ev._id === action.payload._id ? action.payload : ev
        ),
        error: null
      };

    case EVENT_ACTIONS.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(ev => ev._id !== action.payload),
        error: null
      };

    case EVENT_ACTIONS.SET_STATS:
      return { ...state, stats: action.payload, error: null };

    case EVENT_ACTIONS.SET_FILTER:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    default:
      return state;
  }
};


const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const { isAuthenticated, token } = useAuth();

  

  const fetchEvents = async (customFilters = {}) => {
    if (!isAuthenticated) return;
    try {
      dispatch({ type: EVENT_ACTIONS.SET_LOADING, payload: true });
      const filters = { ...state.filters, ...customFilters };
      const result = await eventsAPI.getEvents(filters);

      if (result.success) {
        dispatch({
          type: EVENT_ACTIONS.SET_EVENTS,
          payload: {
            events: result.data.events,
            pagination: result.data.pagination
          }
        });
        if (Object.keys(customFilters).length > 0) {
          dispatch({ type: EVENT_ACTIONS.SET_FILTER, payload: customFilters });
        }
      }
    } catch (error) {
      dispatch({
        type: EVENT_ACTIONS.SET_ERROR,
        payload: error.response?.data?.message || 'Failed to fetch events'
      });
    }
  };

  
  const createEvent = async (eventData) => {
    try {
      dispatch({ type: EVENT_ACTIONS.SET_LOADING, payload: true });
      const result = await eventsAPI.createEvent(eventData);
      if (result.success) {
        dispatch({ type: EVENT_ACTIONS.ADD_EVENT, payload: result.data.event });
        await fetchStats();
        return result;
      }
    } catch (error) {
      dispatch({
        type: EVENT_ACTIONS.SET_ERROR,
        payload: error.response?.data?.message || 'Failed to create event'
      });
      throw error;
    } finally {
      dispatch({ type: EVENT_ACTIONS.SET_LOADING, payload: false });
    }
  };

  
  const updateEvent = async (eventId, eventData) => {
    try {
      dispatch({ type: EVENT_ACTIONS.SET_LOADING, payload: true });
      const result = await eventsAPI.updateEvent(eventId, eventData);
      if (result.success) {
        dispatch({ 
          type: EVENT_ACTIONS.UPDATE_EVENT, 
          payload: result.data.event 
        });
        await fetchStats();
        return result;
      }
    } catch (error) {
      dispatch({
        type: EVENT_ACTIONS.SET_ERROR,
        payload: error.response?.data?.message || 'Failed to update event'
      });
      throw error;
    } finally {
      dispatch({ 
        type: EVENT_ACTIONS.SET_LOADING, 
        payload: false 
      });
    }
  };

  
  const deleteEvent = async (eventId) => {
    try {
      dispatch({ type: EVENT_ACTIONS.SET_LOADING, payload: true });
      const result = await eventsAPI.deleteEvent(eventId);
      if (result.success) {
        dispatch({ 
          type: EVENT_ACTIONS.DELETE_EVENT, 
          payload: eventId 
        });
        await fetchStats();
        return result;
      }
    } catch (error) {
      dispatch({
        type: EVENT_ACTIONS.SET_ERROR,
        payload: error.response?.data?.message || 'Failed to delete event'
      });
      throw error;
    } finally {
      dispatch({ 
        type: EVENT_ACTIONS.SET_LOADING, 
        payload: false 
      });
    }
  };


  const fetchStats = async () => {
    if (!isAuthenticated) return;
    try {
      const result = await eventsAPI.getStats();
      if (result.success) {
        dispatch({ 
          type: EVENT_ACTIONS.SET_STATS, 
          payload: result.data 
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  

  const fetchUpcomingEvents = async (limit = 5) => {
    if (!isAuthenticated) return;
    try {
      const result = await eventsAPI.getUpcomingEvents(limit);
      if (result.success) {
        return result.data.events;
      }
    } catch (error) {
      console.error('Failed to fetch upcoming events:', error);
    }
  };

  const setFilters = (filters) => {
    dispatch({ 
      type: EVENT_ACTIONS.SET_FILTER, 
      payload: filters 
    });
  };

  
  const clearError = () => {
    dispatch({ 
      type: EVENT_ACTIONS.SET_ERROR, 
      payload: null 
    });
  };

  
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchStats();
    }
  }, [isAuthenticated, state.filters.status, state.filters.search]);

  
  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
      fetchStats();
    } else {
      dispatch({ 
        type: EVENT_ACTIONS.SET_EVENTS, 
        payload: { events: [], pagination: {} } 
      });
      
      dispatch({ 
        type: EVENT_ACTIONS.SET_STATS, 
        payload: null 
      });
    }
  }, [token]);

  
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        fetchEvents(); 
      }, 60000); 
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const value = {
    events: state.events,
    stats: state.stats,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    pagination: state.pagination,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchStats,
    fetchUpcomingEvents,
    setFilters,
    clearError,
    refetch: fetchEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};



export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

export default EventContext;
