import axios from 'axios';
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath';


class UsersService {
  constructor(token) {
    this.BASE_URL = getUrlBackend();
    this.element = 'users'

    this.api = axios.create({
      baseURL: `${this.BASE_URL}/api/v2/${this.element}`, // Reemplaza con la URL de tu API
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  async me() {
    try {
      const rta = await this.api.get(`/me`)
      return rta
    } catch (error) {
      console.log(`[ ~ UsersService ~ me ~ error]`, error)
      throw error;
    }
  }
  async updatePhone(phone) {
    try {
      const rta = await this.api.patch(`/`, { phone })
      return rta
    } catch (error) {
      console.log(`[ ~ UsersService ~ updatePhone ~ error]`, error)
      throw error;
    }
  }
  async getByIdUser(id, token) {
    try {
      const rta = await this.api.get(`/user/${id}`, { headers: { Authorization: `Bearer ${token}` } })

      return rta
    } catch (error) {
      console.log(`[ ~ UsersService ~ getByIdUser ~ error]`, error)
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
      console.log(`[ ~ UsersService ~ create ~ error]`, error)
      throw error;
    }
  }
}

export { UsersService }