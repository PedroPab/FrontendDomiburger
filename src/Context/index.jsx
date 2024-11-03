import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';
import { filtrarPedidos } from '../Utils/filtrarPedidos';
import socketApp from '../Utils/socket';

export const MiContexto = createContext();

export const ContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { item: tokenLogin, saveItem: setTokenLogin } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} });
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: false });
  const [alerts, setAlerts] = useState([]);
  const [indexItems, setIndexItems] = useState(null);
  const [zoomMaps, setZoomMaps] = useState(15);
  const [alertaActiva, setAlertaActiva] = useState(false);

  const alternarModo = () => setModoOscuro(!modoOscuro);

  const socket = socketApp({
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Socket conectado 🏁, ID: ${socket.id}`);
      const ROLE = tokenLogin?.user?.role;
      const ID = tokenLogin?.user?.id;
      if (ROLE && ID) {
        socket.emit('api/v2/pedidos/role', ROLE, ID);
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`Socket desconectado 🥊, razón: ${reason}`);
    });

    socket.on('countConnection', (data) => {
      console.log('Conexiones activas:', data);
    });

    socket.on('pedidosIniciales', (pedido) => {
      setItems(filtrarPedidos(pedido, tokenLogin.user.role));
    });

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

    // Limpieza al desmontar el componente
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('countConnection');
      socket.off('pedidosIniciales');
      socket.off('pedidos/added');
      socket.off('pedidos/modified');
      socket.disconnect();
      console.log('Socket desconectado y eventos limpiados');
    };
  }, [tokenLogin]);

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
      }}
    >
      <CambiarTema />
      {children}
    </MiContexto.Provider>
  );
};
