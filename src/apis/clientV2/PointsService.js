import axios from 'axios';
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath';


class PointsService {
  constructor(token) {
    this.BASE_URL = getUrlBackend();
    this.element = 'points'

    this.api = axios.create({
      baseURL: `${this.BASE_URL}/api/v2/${this.element}`, // Reemplaza con la URL de tu API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  async addPoints(pointsData) {
    try {
      const rta = await this.api.post(`/add`, pointsData)
      return rta.data
    } catch (error) {
      throw error?.response?.data || error
    }
  }
}

export { PointsService }