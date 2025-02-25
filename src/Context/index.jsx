// context/OrdersContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { filtrarPedidos } from '../Utils/filtrarPedidos';
// import { socket } from '../Utils/socket';
import { usePreferences } from './PreferencesContext';
import { io } from 'socket.io-client';
import { getUrlSocket } from '../Utils/getUrlApiByOriginPath';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../Utils/localStore';

export const MiContexto = createContext();

export const ContextProvider = ({ children }) => {
  const apiUrl = getUrlSocket();

  const socket = io(`${apiUrl}/apiV2`);

  const { roleSelect: ROLE } = usePreferences()

  const [items, setItems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [idItemSelect, setIdItemSelect] = useState(null);
  const [zoomMaps, setZoomMaps] = useState(15);
  const [alertaActiva, setAlertaActiva] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Nuevo estado para indicar si está conectado

  const { usuarioActual, token, userData } = useAuth()


  const { item: kitchenSelectId, saveItem: setKitchenSelectId } = useLocalStorage({ itemName: 'kitchenSelectId', initialValue: null });

  const changeKitchen = (id) => {
    setKitchenSelectId(id);
  };

  // al comienzo de la aplicación, se  escoje una cocina
  useEffect(() => {
    //miramos cules son las cocinas que tiene asisgndas el usuario
    const assignedKitchens = userData?.assignedKitchens || [];

    if (assignedKitchens.length < 0) {
      toast.error('No tiene cocinas asignadas');
      changeKitchen(null);
      return
    }

    if (kitchenSelectId) {
      const kitchen = assignedKitchens.find(kitchen => kitchen.id === kitchenSelectId);
      if (kitchen) {
        changeKitchen(kitchen);
        return
      }
    }
    // si tiene cocinas asignadas, se escoge la primera
  }, [usuarioActual]);



  const reconnectSocket = () => {
    if (!isConnected) {
      socket.connect();
      console.log("Intentando reconectar...");
    }
  };

  useEffect(() => {
    console.log('intentando conectar socket');
    socket.connect();
    // Manejamos la conexión inicial
    socket.on("connect", () => {
      console.log(`Socket conectado 🏁, ID: ${socket.id}`);
      setIsConnected(true); // Indicamos que el socket está conectado
      if (ROLE) {
        // socket.emit('api/v2/pedidos/role', ROLE, ID);
        const params = {
          token: token,
          role: ROLE,
          kitchenId: kitchenSelectId
        }
        socket.emit('login', params)
      }
      console.log("Señor debugeador , estas son mi variables, no me haga daño")
      console.log(ROLE)
    });

    // Manejo de desconexión
    socket.on('disconnect', (reason) => {
      console.log(`Socket desconectado 🥊, razón: ${reason}`);
      setIsConnected(false); // Indicamos que el socket está desconectado
    });

    socket.on("message", (newMessage) => {
      //ejecutmaos una aletrta 
      toast(newMessage);
    });

    socket.on('order/init', (pedido) => {
      // toast(`Cargando pedidos iniciales 🚚, canidad de pedidos ${pedido.length}`);
      console.log('cantidad de pedidos iniciales:', pedido.length);
      setItems(filtrarPedidos(pedido, ROLE));
    });

    socket.on('order/create', (pedido) => {
      console.log("🚀 ~ socket.on ~ pedido:", pedido)
      setItems((itemsPrevios) => {
        const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        return filtrarPedidos(Array.from(mapItems.values()), ROLE);
      });
    });

    socket.on('order/update', (pedido) => {
      toast(`Pedido actualizado 🚚, ${pedido.id}`);
      setItems((itemsPrevios) => {
        const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        return filtrarPedidos(Array.from(mapItems.values()), ROLE);
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off('pedidosIniciales');
      socket.off('pedidos/added');
      socket.off('pedidos/modified');
    };
  }, [usuarioActual, ROLE, kitchenSelectId]);


  return (
    <MiContexto.Provider
      value={{
        items,
        setItems,
        alerts,
        setAlerts,
        idItemSelect,
        setIdItemSelect,
        zoomMaps,
        setZoomMaps,
        alertaActiva,
        setAlertaActiva,
        isConnected, // Exportamos el estado de conexión
        reconnectSocket, // Exportamos la función de reconexión

        kitchenSelectId,
        changeKitchen
      }}
    >
      {children}
    </MiContexto.Provider>
  );
};

export const useMiContexto = () => useContext(MiContexto)