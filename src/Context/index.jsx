// context/OrdersContext.js
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { filtrarPedidos } from '../Utils/filtrarPedidos';
import { usePreferences } from './PreferencesContext';
import { io } from 'socket.io-client';
import { getUrlSocket } from '../Utils/getUrlApiByOriginPath';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotificationSound } from '../hooks/useNotificationSound';
import { useShowNotification } from '../hooks/useShowNotification';

export const MiContexto = createContext();

export const ContextProvider = ({ children }) => {
  const apiUrl = getUrlSocket();
  const socket = useRef();

  const { roleSelect: ROLE } = usePreferences();
  const { usuarioActual, token, userData } = useAuth();

  const [items, setItems] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [idItemSelect, setIdItemSelect] = useState(null);
  const [zoomMaps, setZoomMaps] = useState(15);
  const [alertaActiva, setAlertaActiva] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [kitchenSelectId, setKitchenSelectId] = useLocalStorage('kitchenSelectId', null);
  const { alertSound, errorCriticalSound, successSound } = useNotificationSound();
  const { notify } = useShowNotification();

  const changeKitchen = (id) => {
    setKitchenSelectId(id);
  };

  // Función que ordena los pedidos por fecha de creación y les asigna un número secuencial.
  // Se asume que cada pedido tiene la propiedad "createdAt" (por ejemplo, en formato ISO).
  const ordenarYNumerarPedidos = (orders) => {
    const sorted = orders.sort((a, b) => (a.dailyOrderNumber) - (b.dailyOrderNumber));
    return sorted.map((order, index) => ({ ...order, orderNumber: index + 1 }));
  };

  // Función que filtra los pedidos según el rol, y luego los ordena y numera.
  const actualizarPedidos = (orders) => {
    const pedidosFiltrados = filtrarPedidos(orders, ROLE);
    return ordenarYNumerarPedidos(pedidosFiltrados);
  };

  // Al inicio de la aplicación se asigna la cocina
  useEffect(() => {
    const assignedKitchens = userData?.assignedKitchens || [];
    if (assignedKitchens.length < 0) {
      toast.error('No tiene cocinas asignadas');
      changeKitchen(null);
      return;
    }
    if (assignedKitchens.length === 1) {
      changeKitchen(assignedKitchens[0]);
      return;
    }
    if (kitchenSelectId) {
      const kitchen = assignedKitchens.find(kitchen => kitchen.id === kitchenSelectId);
      if (kitchen) {
        changeKitchen(kitchen);
        return;
      }
    }
    // Si tiene varias cocinas asignadas, se selecciona la primera
  }, [usuarioActual]);

  const reconnectSocket = () => {
    if (!isConnected) {
      socket.current.connect();
      console.log("Intentando reconectar...");
    }
  };

  useEffect(() => {
    socket.current = io(`${apiUrl}/apiV2`);

    console.log('Intentando conectar socket');
    socket.current.connect();

    // Conexión inicial
    socket.current.on("connect", () => {
      successSound();
      console.log(`Socket conectado 🏁, ID: ${socket.current.id}`);
      setIsConnected(true);
      if (ROLE) {
        const params = {
          token: token,
          role: ROLE,
          kitchenId: kitchenSelectId
        };
        socket.current.emit('login', params);
      }
      console.log("Variables de conexión:", ROLE);
    });

    // Manejo de desconexión
    socket.current.on('disconnect', (reason) => {
      console.log(`Socket desconectado 🥊, razón: ${reason}`);
      errorCriticalSound();
      setIsConnected(false);
    });

    // Manejo de mensajes generales
    socket.current.on("message", (newMessage) => {
      const { type, message } = newMessage;
      if (type === 'alert') {
        alertSound();
        notify('Nuevo mensaje', { body: message });
      }
      toast(message);
    });

    // Pedido inicial: se filtran, ordenan y numeran
    socket.current.on('order/init', (orders) => {
      console.log('Pedidos iniciales recibidos:', orders.length);
      const processedOrders = actualizarPedidos(orders);
      setItems(processedOrders);
    });

    // Cuando se crea un pedido
    socket.current.on('order/create', (pedido) => {
      toast(`Pedido creado 🚚, ${pedido.id}`);
      alertSound();
      setItems((prevItems) => {
        const mapItems = new Map(prevItems.map((item) => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        return actualizarPedidos(Array.from(mapItems.values()));
      });
    });

    // Cuando se actualiza un pedido
    socket.current.on('order/update', (pedido) => {
      setItems((prevItems) => {
        const mapItems = new Map(prevItems.map((item) => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        return actualizarPedidos(Array.from(mapItems.values()));
      });
    });

    // Cuando se remueve un pedido
    socket.current.on('order/remove', (pedido) => {
      console.warn("Pedido removido:", pedido);
      toast(`Pedido removido 🚚, ${pedido.id}`);
      setItems((prevItems) => {
        const mapItems = new Map(prevItems.map((item) => [item.id, item]));
        mapItems.delete(pedido.id);
        return actualizarPedidos(Array.from(mapItems.values()));
      });
    });

    // Cuando se elimina un pedido
    socket.current.on('order/delete', (pedido) => {
      toast(`Pedido eliminado 🚚, ${pedido.id}`);
      setItems((prevItems) => {
        const mapItems = new Map(prevItems.map((item) => [item.id, item]));
        mapItems.delete(pedido.id);
        return actualizarPedidos(Array.from(mapItems.values()));
      });
    });

    // Limpiamos los listeners al desmontar
    return () => {
      console.warn('Desconectando socket...');
      socket.current.off("connect");
      socket.current.off("disconnect");
      socket.current.off("message");
      socket.current.off('order/init');
      socket.current.off('order/create');
      socket.current.off('order/update');
      socket.current.off('order/remove');
      socket.current.off('order/delete');
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
        isConnected,
        reconnectSocket,
        kitchenSelectId,
        changeKitchen
      }}
    >
      {children}
    </MiContexto.Provider>
  );
};

export const useMiContexto = () => useContext(MiContexto);
