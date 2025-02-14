import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../Utils/localStore';

// Crear el contexto
export const PreferencesContext = createContext();

// Crear el provider para este contexto
export const PreferencesProvider = ({ children }) => {
  const { item: isDarkMode, saveItem: setIsDarkMode } = useLocalStorage({
    itemName: 'isDarkMode',
    initialValue: false,
  }); // Modo oscuro por defecto

  const { item: roleSelect, saveItem: setRoleSelect } = useLocalStorage({
    itemName: 'roleSelect',
    initialValue: '',
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (isDarkMode) {
      htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-bs-theme');
    }
  }, [isDarkMode])

  return (
    <PreferencesContext.Provider value={{
      isDarkMode, toggleTheme,

      roleSelect, setRoleSelect,
    }}>
      {children}
    </PreferencesContext.Provider>
  );
};

// Hook para consumir el contexto
export const usePreferences = () => useContext(PreferencesContext);
