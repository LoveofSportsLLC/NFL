//NFL/frontend-container/src/hooks/useLocalStorage.jsx
import { useState } from "react";
import { log } from "../utils/logs"; // Import the log utility

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      log("useLocalStorage.jsx", "useState", "Error:", error.message);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      log("useLocalStorage.jsx", "setValue", "Error:", error.message);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
