import { ApiClient } from '../ConfigApiV2';


class LocationsService {
  constructor() {
    this.api = new ApiClient(`locations`);
  }
  async getByIdUser(id, token) {
    try {
      const rta = await this.api.get(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })

      return rta
    } catch (error) {
      console.log(`[ ~ LocationsService ~ getByIdUser ~ error]`, error)
      throw error;
    }

  }
  async create(data, token) {
    try {
      const rta = await this.api.post(`/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return rta
    } catch (error) {
      console.log(`[ ~ LocationsService ~ create ~ error]`, error)
      throw error;
    }
  }
}

export const locationsService = new LocationsService();