import { createContext, useEffect, useState } from 'react';
import { cambiarTema } from '../Utils/theme';

const ENV = import.meta.env

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  // Estado para el modo oscuro
  const [modoOscuro, setModoOscuro] = useState(true);

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(prevModo => !prevModo);
    cambiarTema(modoOscuro)
  };

  //get pedidos 
  const [items, setItems] = useState(null)

  useEffect(() => {
    const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`;

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzeXVWWXI2MDlUaUltcXQxeUtwQSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MjM2MjQ1Mn0.ypWAj30EdC8J74TcO3BaXzzRBsaMddhdUe-Iumu4lhs"

    const options = {
      method: 'GET',
      headers: {
        Authorization: token
      }
    };

    // setInterval(() => {
    //   fetch(`${apiUrl}/api/pedidos/historialDia`, options)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log(data, '<=data');
    //       return data
    //     })
    //     .then(data => setItems(data.body))
    // }, 800000)

    fetch(`${apiUrl}/api/pedidos/historialDia`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data, '<=data');
        return data
      })
      .then(data => setItems(data.body))

  }, [])


  return (
    <MiContexto.Provider value={
      {
        modoOscuro, alternarModo,

        items, setItems
      }
    }>
      {children}
    </MiContexto.Provider>
  )
}


