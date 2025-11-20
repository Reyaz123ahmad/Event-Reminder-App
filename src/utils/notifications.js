export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/vite.svg',
      badge: '/vite.svg',
      ...options
    });
  }
};

export const scheduleEventNotification = (eventTitle, eventDate) => {
  const now = new Date();
  const eventTime = new Date(eventDate);
  const timeDiff = eventTime - now;
  const reminderTime = timeDiff - (30 * 60 * 1000); 

  if (reminderTime > 0) {
    setTimeout(() => {
      showNotification('Event Reminder', {
        body: `${eventTitle} starts in 30 minutes!`,
        tag: 'event-reminder'
      });
    }, reminderTime);
  }
};
