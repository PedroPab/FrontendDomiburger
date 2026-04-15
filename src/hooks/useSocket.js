import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

/**
 * Configuración optimizada para móviles y redes inestables
 */
export const SOCKET_OPTIONS = {
  // Permitir fallback a polling si WebSocket falla
  // Muchos proxies y redes móviles bloquean WebSockets
  transports: ['websocket', 'polling'],
  upgrade: true,

  // Timeout de conexión inicial (5 segundos)
  timeout: 5000,

  // Reconexión automática
  reconnection: true,

  // Intentos infinitos de reconexión
  reconnectionAttempts: Infinity,

  // Delay inicial entre reconexiones
  reconnectionDelay: 1000,

  // Máximo delay entre reconexiones (backoff exponencial)
  reconnectionDelayMax: 10000,

  // Factor de randomización
  randomizationFactor: 0.5,
};

const useSocket = (serverUrl) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(serverUrl, SOCKET_OPTIONS);

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
