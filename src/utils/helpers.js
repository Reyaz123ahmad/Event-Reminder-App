export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTimeRemaining = (eventDate) => {
  const now = new Date();
  const event = new Date(eventDate);
  const diffTime = event - now;
  
  if (diffTime <= 0) return 'Event completed';
  
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h left`;
  
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  return `${minutes}m left`;
};

export const isEventCompleted = (eventDate) => {
  const now = new Date();
  const event = new Date(eventDate);
  return event < now;
};

export const getEventStatus = (event) => {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  if (eventDate < now) {
    return 'completed';
  }
  return event.status; 
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const validateEvent = (eventData) => {
  const errors = {};
  
  if (!eventData.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!eventData.date) {
    errors.date = 'Date is required';
  } else if (new Date(eventData.date) <= new Date()) {
    errors.date = 'Event date must be in the future';
  }
  
  return errors;
};
