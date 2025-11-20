import api from './api.js';

export const eventsAPI = {
  
  createEvent: async (eventData) => {
  const response = await api.post('/events', eventData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
},


  getEvents: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await api.get(`/events?${params}`);
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/events/stats');
    return response.data;
  },

  getUpcomingEvents: async () => {
    const response = await api.get('/events/upcoming');
    return response.data;
  }
};
