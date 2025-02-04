import { ApiClient } from '../ConfigApiV2';

const api = new ApiClient(`locations`);

class LocationsService {
  constructor() {
    this.api = api;
  }
  async getByIdUser(id, token) {
    try {
      const rta = await this.api.get(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })

      return rta;
    } catch (error) {
      console.log(`[ ~ LocationsService ~ getByIdUser ~ error]`, error)
      throw error;
    }

  }


}

export const locationsService = new LocationsService();