import io from 'socket.io-client';
import { getUrlSocket } from './getUrlApiByOriginPath';

const apiUrl = getUrlSocket();

console.log(`[socket] urlApi `, apiUrl)
const socket = io(apiUrl);

export { socket };