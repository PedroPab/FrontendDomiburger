import axios from 'axios';
import { getUrlBackend } from '../Utils/getUrlApiByOriginPath';

class ApiClient {
  constructor(element) {
    const BASE_URL = getUrlBackend();
    console.log('BASE_URL', BASE_URL)

    this.apiClient = axios.create({
      baseURL: `${BASE_URL}/api/v2/${element}`, // Reemplaza con la URL de tu API
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.apiClient;
  }
}

export { ApiClient };