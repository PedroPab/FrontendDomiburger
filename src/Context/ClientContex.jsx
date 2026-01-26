 
import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ContextClient = createContext()

 
export const ContextProviderClient = ({ children }) => {

  //token de usuario
  const [tokenLogin, setTokenLogin] = useLocalStorage('tokenUserClient', {})

  const [alerts, setAlerts] = useState([]);

  const [alertaActiva, setAlertaActiva] = useState(false);

  const { item: pedido, saveItem: setPedido } = useLocalStorage({ itemName: 'pedido', initialValue: {} })


  return (
    <ContextClient.Provider value={
      {
        tokenLogin, setTokenLogin,

        alerts, setAlerts,

        alertaActiva, setAlertaActiva,

        pedido, setPedido,
      }
    }>
      {children}
    </ContextClient.Provider>
  )
}