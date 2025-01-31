/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';
import { getIdToken } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';

export const ContexClient = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProviderClient = ({ children }) => {

  //token de usuario
  const [token, setToken] = useState('');
  useEffect(() => {
    const getToken = async () => {
      const getToken = await getIdToken(FirebaseAuth.currentUser);
      console.log('Token:', getToken);
      setToken(getToken);
    };
    getToken();
  }, []);

  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([]);


  const [alertaActiva, setAlertaActiva] = useState(false);


  const { item: pedido, saveItem: setPedido } = useLocalStorage({ itemName: 'pedido', initialValue: {} })




  return (
    <ContexClient.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        token, setToken,

        modoOscuro, alternarModo,

        alerts, setAlerts,

        alertaActiva, setAlertaActiva,

        pedido, setPedido,
      }
    }>
      <CambiarTema modoOscuro={modoOscuro} />
      {children}
    </ContexClient.Provider>
  )
}


