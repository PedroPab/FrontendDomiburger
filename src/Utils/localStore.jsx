import { useEffect, useState } from "react";

function useLocalStorage({ itemName, initialValue }) {
  const [item, setItem] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const logicaFuncion = () => {
    try {
      const localStorageItem = localStorage.getItem(itemName);

      let parsedItem;

      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
        setItem(parsedItem);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    logicaFuncion()
  }, []);

  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage }