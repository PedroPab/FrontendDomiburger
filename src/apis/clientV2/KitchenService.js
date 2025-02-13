import axios from 'axios';
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath';

class KitchenService {
  constructor(token) {
    this.BASE_URL = getUrlBackend();
    this.element = 'kitchens'

    this.api = axios.create({
      baseURL: `${this.BASE_URL}/api/v2/${this.element}`, // Reemplaza con la URL de tu API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  async getSelectKitchen(id) {
    const rta = await this.api.get(`/selectKitchen/${id}`)
    return rta
  }
  async getByIdUser(id) {
    try {
      const rta = await this.api.get(`/user/${id}`)

      return rta
    } catch (error) {
      console.log(`[~LocationsService ~getByIdUser ~error]`, error)
      throw error;
    }

  }
  async create(data) {
    try {
      const rta = await this.api.post(`/ `, data);
      return rta
    } catch (error) {
      console.log(`[~LocationsService ~create ~error]`, error)
      throw error;
    }
  }
}

export { KitchenService }