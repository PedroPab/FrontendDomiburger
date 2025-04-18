import axios from 'axios';
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath';

class LocationsService {
	constructor(token) {
		this.BASE_URL = getUrlBackend();
		this.element = 'locations'

		const headers = token ? {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		} : {
			'Content-Type': 'application/json'
		}
		this.api = axios.create({
			baseURL: `${this.BASE_URL}/api/v2/${this.element}`, // Reemplaza con la URL de tu API
			headers,
		});
	}
	async getByIdUser(id) {
		try {
			const rta = await this.api.get(`/user/${id}`)

			return rta.data
		} catch (error) {
			console.log(`[~LocationsService ~getByIdUser ~error]`, error)
			throw error;
		}
	}
	async getByIdClient(id) {
		try {
			const rta = await this.api.get(`/client/${id}`)

			return rta.data
		} catch (error) {
			console.log(`[~LocationsService ~getByIdClient ~error]`, error)
			throw error;
		}
	}
	async getById(id) {
		const rta = await this.api.get(`/${id}`)

		return rta?.data
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
	async createPublic(data) {
		try {
			const rta = await this.api.post(`/public`, data);
			return rta
		} catch (error) {
			console.log(`[~LocationsService ~createPublic ~error]`, error)
			throw error;
		}
	}
}

export { LocationsService }