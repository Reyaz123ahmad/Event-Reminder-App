
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    return date.toLocaleString('en-US', options);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Date format error';
  }
};

export const getTimeRemaining = (eventDate) => {
  try {
    const now = new Date();
    const event = new Date(eventDate);
    
    if (isNaN(event.getTime())) {
      return 'Invalid date';
    }
    
    const diffTime = event - now;
    
    if (diffTime <= 0) return 'Event completed';
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  } catch (error) {
    console.error('Time calculation error:', error);
    return 'Time calculation error';
  }
};

export const formatExactDateTime = (dateString) => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    return date.toLocaleString('en-US', options);
  } catch (error) {
    console.error('Exact date formatting error:', error);
    return 'Date format error';
  }
};


export const toLocalDateTimeString = (dateString) => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    console.error('Local datetime conversion error:', error);
    return '';
  }
};


export const toISODateTimeString = (localDateTimeString) => {
  try {
    if (!localDateTimeString) return '';
    
    const date = new Date(localDateTimeString);
    
    if (isNaN(date.getTime())) {
      return '';
    }
    
    return date.toISOString();
  } catch (error) {
    console.error('ISO datetime conversion error:', error);
    return '';
  }
};


export const isEventCompleted = (eventDate) => {
  try {
    const now = new Date();
    const event = new Date(eventDate);
    
    if (isNaN(event.getTime())) {
      return false;
    }
    
    return event < now;
  } catch (error) {
    console.error('Event completion check error:', error);
    return false;
  }
};


export const getEventStatus = (event) => {
  try {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    if (isNaN(eventDate.getTime())) {
      return 'error';
    }
    
    if (eventDate < now) {
      return 'completed';
    }
    
    return event.status || 'upcoming';
  } catch (error) {
    console.error('Event status check error:', error);
    return 'error';
  }
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
  } else {
    const selectedDate = new Date(eventData.date);
    const now = new Date();
    
    if (isNaN(selectedDate.getTime())) {
      errors.date = 'Invalid date format';
    } else if (selectedDate <= now) {
      errors.date = 'Event date must be in the future';
    }
  }
  
  return errors;
};


export const debugDateConversion = (dateString) => {
  const date = new Date(dateString);
  const localString = toLocalDateTimeString(dateString);
  const isoString = toISODateTimeString(localString);
  
  console.log('Debug Date Conversion:');
  console.log('Original:', dateString);
  console.log('Date object:', date);
  console.log('Local string:', localString);
  console.log('ISO string:', isoString);
  console.log('Formatted:', formatExactDateTime(dateString));
  console.log('---');
};
