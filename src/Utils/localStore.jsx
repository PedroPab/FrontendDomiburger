import { useEffect, useState } from "react";

function useLocalStorage({ itemName, initialValue }) {
  const [item, setItem] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);



  useEffect(() => {
    const logicaFuncion = () => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        console.log(`itemName ${itemName}`, localStorageItem)

        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          console.log("🚀 ~ file: localStore.jsx:20 ~ logicaFuncion ~ parsedItem:", parsedItem)
          setItem(parsedItem);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
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