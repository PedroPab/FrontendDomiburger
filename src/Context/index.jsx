import { createContext, useEffect, useState } from 'react';
import { cambiarTema } from '../Utils/theme';
import { useLocalStorage } from '../Utils/localStore';

const ENV = import.meta.env

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //token de usuario
  const tokenItemLocalStore = useLocalStorage({ itemName: 'tokenUseremPloyee', initialValue: {} })
  console.log("🚀 ~ file: index.jsx:13 ~ ContextProvider ~ tokenItemLocalStore:", tokenItemLocalStore.item)
  const [tokenLogin, setTokenLogin] = useState(tokenItemLocalStore.item)
  console.log("🚀 ~ file: index.jsx:15 ~ ContextProvider ~ tokenLogin:", tokenLogin)

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

  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([{ type: 'success', id: '4', message: 'Operación exitosa' }]);



  return (
    <MiContexto.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        tokenLogin, setTokenLogin, tokenItemLocalStore,


        modoOscuro, alternarModo,

        items, setItems,

        alerts, setAlerts
      }
    }>
      {children}
    </MiContexto.Provider>
  )
}


