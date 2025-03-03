import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const getStoredValue = () => {
    if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};
