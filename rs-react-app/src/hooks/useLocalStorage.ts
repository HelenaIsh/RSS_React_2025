import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const getStoredValue = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
};
