/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';
import socketApp from '../Utils/socket';

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //token de usuario
  const { item: tokenLogin, saveItem: setTokenLogin } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} })

  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };

  const lanzarAlarma = (pedido) => {
    console.log(`Nuevo pedido recibido:✨✨✨✨ `, pedido);
  };

  //get pedidos 
  const { item: items, saveItem: setItems } = useLocalStorage({ itemName: 'items', initialValue: null })


  useEffect(() => {


    const socket = socketApp()
    // Escuchar eventos de Socket.IO
    socket.on('connect', () => {
      console.log(`conectando 🏁`);
      // const token = `Bearer ${tokenLogin.token}`
      const ROLE = tokenLogin?.user?.role
      const ID = tokenLogin?.user?.id
      if (!ROLE || !ID) return
      socket.emit('api/pedidos/role', ROLE, ID);
    });

    socket.on('api/pedidos', (pedidos) => {
      console.log("🎈:", pedidos)

      //creamos un mapa para que no se reten y se puedan acutralisar 
      const mapItems = new Map
      items?.forEach(element => {
        mapItems.set(element.id, element)
      });

      const countPre = mapItems.size

      let pedidosNuevos = []
      pedidos?.forEach(element => {
        mapItems.set(element.id, element)
      });
      const countPos = mapItems.size

      if (countPos > countPre) lanzarAlarma(pedidosNuevos)

      const newArrayItems = Array.from(mapItems.values());

      setItems(newArrayItems);

    });

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      socket.off('nuevoPedido');
    };

  }, [tokenLogin]);


  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([]);

  //el pedio que tenemos selecionado 
  const [indexItems, setIndexItems] = useState(null)

  //zoom del mapa
  const [zoomMaps, setZoomMaps] = useState(15)


  return (
    <MiContexto.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        tokenLogin, setTokenLogin,


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


