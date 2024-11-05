import io from 'socket.io-client';
// eslint-disable-next-line react-refresh/only-export-components
const ENV = import.meta.env

const apiUrl = `${ENV.VITE_HOST_WEB_SOCKET}`

console.log(`[ ~ apiUrl]`, apiUrl)
const socket = io(apiUrl);

export { socket };