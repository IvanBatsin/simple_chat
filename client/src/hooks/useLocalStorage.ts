import { useState, useEffect } from 'react';
import { IContact, IConversation } from '../interfaces';

const PREFIX = 'whatsup-prefix:';

export const useLocalStorage = <T extends string | IContact[] | IConversation[]>(key: string, initilaValue: T | Function): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState<T>(() => {
    const jsonData = window.localStorage.getItem(prefixedKey);
    if (jsonData) {
      return JSON.parse(jsonData);
    } 

    if (typeof initilaValue === 'function') {
      return initilaValue();
    } else {
      return initilaValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}