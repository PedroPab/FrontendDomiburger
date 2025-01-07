import axios from 'axios';

const BASE_URL = import.meta.env.VITE_HOST_MICROSERVICES
console.log('BASE_URL', BASE_URL)
const apiClient = axios.create({
  baseURL: `${BASE_URL}`, // Reemplaza con la URL de tu API
  headers: {
  },
});

export default apiClient;