import axios from 'axios';
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath';
import { tr } from 'faker/lib/locales';

class OrderService {
	constructor(token) {
		this.BASE_URL = getUrlBackend();
		this.element = 'orders'

		this.api = axios.create({
			baseURL: `${this.BASE_URL}/api/v2/${this.element}`, // Reemplaza con la URL de tu API
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
		});
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
		const rta = await this.api.post(`/ `, data);
		return rta
	}
	async createPublicAdmin(data) {
		const rta = await this.api.post(`/public/admin `, data);
		return rta
	}
	async changeStatus(id, previousState, nextState) {
		try {
			const body = {
				previousState,
				nextState
			}
			const rta = await this.api.patch(`/status/${id}`, body);
			return rta.data
		} catch (error) {
			console.log("🚀 ~ OrderService ~ changeStatus ~ error:", error)
			throw error?.response?.data
		}
	}
	async updateCurrier(id, courierId) {
		const body = {
			courierUserId: courierId
		}
		const rta = await this.api.patch(`/courier/${id}`, body);
		return rta.data
	}
}

export { OrderService }