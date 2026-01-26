import { useEffect, useState } from "react";

function useLocalStorage({ itemName, initialValue }) {
  let localStorageItem1 = localStorage.getItem(itemName);
  let parsedItem1;

  if (localStorageItem1 && localStorageItem1 !== "undefined") {
    parsedItem1 = JSON.parse(localStorageItem1);
  } else {
    parsedItem1 = initialValue;
  }

  const [item, setItem] = useState(parsedItem1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);



  useEffect(() => {
    const logicaFuncion = () => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        console.log("🚀 ~ logicaFuncion ~ localStorageItem:", itemName, "==", localStorageItem)
        // console.log(`itemName ${itemName}`, localStorageItem)

        let parsedItem;

        if (!localStorageItem || localStorageItem === "undefined") {
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