import { createContext, useState } from 'react';
import { cambiarTema } from '../Utils/theme';

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  // Estado para el modo oscuro
  const [modoOscuro, setModoOscuro] = useState(false);

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(prevModo => !prevModo);
    cambiarTema(modoOscuro)
  };

  return (
    <MiContexto.Provider value={
      {
        modoOscuro,
        alternarModo,

      }
    }>
      {children}
    </MiContexto.Provider>
  )
}


