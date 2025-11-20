import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      return key === 'token' ? item : JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key ${key}:, error`);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        key, 
        key === 'token' ? valueToStore : JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.error(`Error setting localStorage key ${key}:, error`);
    }
  };

  return [storedValue, setValue];
};
