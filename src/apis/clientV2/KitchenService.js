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
  async getAll(pagination, filter) {
    const { page, limit } = pagination || {};
    const query = new URLSearchParams();
    if (page) query.append('page', page);
    if (limit) query.append('limit', limit);
    if (filter) {
      if (filter.key) query.append('key', filter.key);
      if (filter.value) query.append('value', filter.value);
      if (filter.option) query.append('option', filter.option);
    }
    const rta = await this.api.get(`?${query.toString()}`)
    return rta.data
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