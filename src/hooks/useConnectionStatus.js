import { useState, useEffect, useRef, useCallback } from 'react';

// Estados de conexión
export const CONNECTION_STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  RECONNECTING: 'reconnecting',
  DISCONNECTED: 'disconnected',
  OFFLINE: 'offline'
};

/**
 * Hook para detectar estado de conexión a internet
 */
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

/**
 * Hook para manejar estados de conexión del socket
 * Combina detección de internet + estado del socket
 */
export const useConnectionStatus = (socket) => {
  const [status, setStatus] = useState(CONNECTION_STATUS.IDLE);
  const isOnline = useOnlineStatus();
  const reconnectAttempts = useRef(0);

  // Actualizar estado cuando cambia la conexión a internet
  useEffect(() => {
    if (!isOnline) {
      setStatus(CONNECTION_STATUS.OFFLINE);
    } else if (status === CONNECTION_STATUS.OFFLINE) {
      setStatus(CONNECTION_STATUS.RECONNECTING);
    }
  }, [isOnline, status]);

  // Registrar eventos del socket
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      reconnectAttempts.current = 0;
      setStatus(CONNECTION_STATUS.CONNECTED);
    };

    const handleDisconnect = (reason) => {
      if (reason === 'io client disconnect') {
        setStatus(CONNECTION_STATUS.DISCONNECTED);
      } else if (isOnline) {
        setStatus(CONNECTION_STATUS.RECONNECTING);
      } else {
        setStatus(CONNECTION_STATUS.OFFLINE);
      }
    };

    const handleConnectError = () => {
      if (!isOnline) {
        setStatus(CONNECTION_STATUS.OFFLINE);
      } else {
        setStatus(CONNECTION_STATUS.DISCONNECTED);
      }
    };

    const handleReconnectAttempt = (attemptNumber) => {
      reconnectAttempts.current = attemptNumber;
      setStatus(CONNECTION_STATUS.RECONNECTING);
    };

    // Registrar eventos
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    // Eventos del manager (socket.io)
    if (socket.io) {
      socket.io.on('reconnect_attempt', handleReconnectAttempt);
    }

    // Estado inicial
    if (socket.connected) {
      setStatus(CONNECTION_STATUS.CONNECTED);
    } else if (isOnline) {
      setStatus(CONNECTION_STATUS.CONNECTING);
    } else {
      setStatus(CONNECTION_STATUS.OFFLINE);
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      if (socket.io) {
        socket.io.off('reconnect_attempt', handleReconnectAttempt);
      }
    };
  }, [socket, isOnline]);

  return {
    status,
    isOnline,
    isConnected: status === CONNECTION_STATUS.CONNECTED,
    isConnecting: status === CONNECTION_STATUS.CONNECTING,
    isReconnecting: status === CONNECTION_STATUS.RECONNECTING,
    isOffline: status === CONNECTION_STATUS.OFFLINE,
    reconnectAttempts: reconnectAttempts.current
  };
};
