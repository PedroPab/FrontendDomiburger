/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';

const ENV = import.meta.env

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //token de usuario
  const tokenItemLocalStore = useLocalStorage({ itemName: 'tokenUser', initialValue: {} })

  const [tokenLogin, setTokenLogin] = useState(tokenItemLocalStore.item)

  const saveToken = (token) => {
    setTokenLogin(token)
    tokenItemLocalStore.saveItem(token)
  }
  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
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
        // console.log(data, '<=data');
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
        tokenLogin, saveToken,


        modoOscuro, alternarModo,

        items, setItems,

        alerts, setAlerts
      }
    }>
      <CambiarTema />
      {children}
    </MiContexto.Provider>
  )
}


