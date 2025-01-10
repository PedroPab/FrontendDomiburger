import axios from 'axios';
import { getUrlBackend } from '../Utils/getUrlApiByOriginPath';

const BASE_URL = getUrlBackend();
console.log('BASE_URL', BASE_URL)
const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`, // Reemplaza con la URL de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;