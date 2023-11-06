/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';

const ENV = import.meta.env

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //token de usuario
  const { item: tokenLogin, saveItem: saveToken } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} })


  // const saveToken = (token) => {
  //   setTokenLogin(token)
  // }
  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  //get pedidos 
  const [items, setItems] = useState(null)

  useEffect(() => {
    if (!tokenLogin.token) return
    const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`;

    const token = `Bearer ${tokenLogin.token}`

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

  }, [tokenLogin])

  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([{ type: 'success', id: '4', message: 'Operación exitosa' }]);

  //el pedio que tenemos selecionado 
  const [indexItems, setIndexItems] = useState(null)

  //zoom del mapa
  const [zoomMaps, setZoomMaps] = useState(15)


  return (
    <MiContexto.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        tokenLogin, saveToken,


        modoOscuro, alternarModo,

        items, setItems,

        alerts, setAlerts,

        indexItems, setIndexItems,

        zoomMaps, setZoomMaps
      }
    }>
      <CambiarTema />
      {children}
    </MiContexto.Provider>
  )
}


