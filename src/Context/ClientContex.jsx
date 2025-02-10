/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from 'react';
import { useLocalStorage } from '../Utils/localStore';

export const ContexClient = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProviderClient = ({ children }) => {
  console.log(`[ContextProviderClient]`);

  //token de usuario
  const { item: tokenLogin, saveItem: setTokenLogin } = useLocalStorage({ itemName: 'tokenUserClient', initialValue: {} })

  // Estado para el modo oscuro

  // Función para alternar entre el modo oscuro y claro

  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([]);


  const [alertaActiva, setAlertaActiva] = useState(false);


  const { item: pedido, saveItem: setPedido } = useLocalStorage({ itemName: 'pedido', initialValue: {} })




  return (
    <ContexClient.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        tokenLogin, setTokenLogin,

        alerts, setAlerts,

        alertaActiva, setAlertaActiva,

        pedido, setPedido,
      }
    }>
      {children}
    </ContexClient.Provider>
  )
}


