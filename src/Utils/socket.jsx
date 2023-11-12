import { io } from 'socket.io-client';
// eslint-disable-next-line react-refresh/only-export-components
const ENV = import.meta.env

const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`

const socket = io(apiUrl); // Reemplaza con la URL de tu servidor Socket.IO

export default socket;
