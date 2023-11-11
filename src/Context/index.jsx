/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';
import socket from '../Utils/socket';

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //token de usuario
  const { item: tokenLogin, saveItem: saveToken } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} })

  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  //get pedidos 
  const [items, setItems] = useState(null)
  useEffect(() => {
    // Escuchar eventos de Socket.IO
    socket.on('connect', () => {
      // const token = `Bearer ${tokenLogin.token}`
      const ROLE = tokenLogin?.user?.role
      const ID = tokenLogin?.user?.id
      if (!ROLE || !ID) return
      socket.emit('api/pedidos/role', ROLE, ID);
    });

    socket.on('api/pedidos', (pedidosEEE) => {
      const newListPedido = pedidosEEE.map(e => ({ data: e }))
      if (!items) {
        setItems(newListPedido);
      } else {
        setItems([...items, ...newListPedido]);
      }
    });

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      socket.off('nuevoPedido');
    };


  }, [tokenLogin]);


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


