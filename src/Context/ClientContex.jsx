/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';

export const ContexClient = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProviderClient = ({ children }) => {
  console.log(`hoal`);

  //token de usuario
  const { item: tokenLogin, saveItem: setTokenLogin } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} })

  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([]);


  const [alertaActiva, setAlertaActiva] = useState(false);



  return (
    <ContexClient.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        tokenLogin, setTokenLogin,

        modoOscuro, alternarModo,

        alerts, setAlerts,

        alertaActiva, setAlertaActiva,
      }
    }>
      <CambiarTema modoOscuro={modoOscuro} />
      {children}
    </ContexClient.Provider>
  )
}


