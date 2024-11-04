import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';
import { filtrarPedidos } from '../Utils/filtrarPedidos';
import { io } from 'socket.io-client';

// Inicializamos el socket fuera del componente
const socket = io('http://localhost:8087');

export const MiContexto = createContext();

export const ContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { item: tokenLogin, saveItem: setTokenLogin } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} });
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: false });
  const [alerts, setAlerts] = useState([]);
  const [indexItems, setIndexItems] = useState(null);
  const [zoomMaps, setZoomMaps] = useState(15);
  const [alertaActiva, setAlertaActiva] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Nuevo estado para indicar si está conectado

  const alternarModo = () => setModoOscuro(!modoOscuro);

  const ROLE = tokenLogin?.user?.role;
  const ID = tokenLogin?.user?.id;

  useEffect(() => {
    // Manejamos la conexión inicial
    socket.on("connect", () => {
      console.log(`Socket conectado 🏁, ID: ${socket.id}`);
      setIsConnected(true); // Indicamos que el socket está conectado
      if (ROLE && ID) {
        socket.emit('api/v2/pedidos/role', ROLE, ID);
      }
    });

    // Manejo de desconexión
    socket.on('disconnect', (reason) => {
      console.log(`Socket desconectado 🥊, razón: ${reason}`);
      setIsConnected(false); // Indicamos que el socket está desconectado
    });

    // Evento de mensajes
    socket.on("message", (newMessage) => {
      console.log(newMessage);
    });

    // Recibir pedidos iniciales
    socket.on('pedidosIniciales', (pedido) => {
      setItems(filtrarPedidos(pedido, tokenLogin.user.role));
    });

    // Actualizaciones de pedidos
    socket.on('pedidos/added', (pedido) => {
      setItems((itemsPrevios) => {
        const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        return filtrarPedidos(Array.from(mapItems.values()), tokenLogin.user.role);
      });
    });

    socket.on('pedidos/modified', (pedido) => {
      setItems((itemsPrevios) => {
        const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        return filtrarPedidos(Array.from(mapItems.values()), tokenLogin.user.role);
      });
    });

    // Limpieza de listeners al desmontar
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off('pedidosIniciales');
      socket.off('pedidos/added');
      socket.off('pedidos/modified');
      console.log('Socket desconectado y eventos limpiados');
    };
  }, [ROLE, ID, tokenLogin]);

  return (
    <MiContexto.Provider
      value={{
        tokenLogin,
        setTokenLogin,
        modoOscuro,
        alternarModo,
        items,
        setItems,
        alerts,
        setAlerts,
        indexItems,
        setIndexItems,
        zoomMaps,
        setZoomMaps,
        alertaActiva,
        setAlertaActiva,
        isConnected, // Exportamos el estado de conexión
      }}
    >
      <CambiarTema />
      {children}
    </MiContexto.Provider>
  );
};
