import io from 'socket.io-client';
// eslint-disable-next-line react-refresh/only-export-components
const ENV = import.meta.env

const apiUrl = `${ENV.VITE_HOST_WEB_SOCKET}`

const socket = () => { return io(apiUrl) }; // Reemplaza con la URL de tu servidor Socket.IO

export default socket;
