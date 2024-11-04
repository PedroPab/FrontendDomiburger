// hooks/useSocket.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = (serverUrl) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(serverUrl, {
      transports: ['websocket'], // Asegura que se usa solo WebSocket
      reconnectionAttempts: 5, // Intentos de reconexión
      reconnectionDelay: 1000, // Espera entre reconexiones
    });

    setSocket(socketInstance);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socketInstance.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket;
