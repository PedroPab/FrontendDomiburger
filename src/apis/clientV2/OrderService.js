import axios from 'axios';
import { getUrlBackend } from '../../Utils/getUrlApiByOriginPath';

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
	async delete(id) {
		try {
			const rta = await this.api.delete(`/${id}`);
			return rta
		} catch (error) {
			throw error.response.data
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
	async updateKitchen(id, kitchenId) {
		const body = {
			kitchenId: kitchenId
		}
		const rta = await this.api.patch(`/kitchen/${id}`, body);
		return rta.data
	}
	async updatePayment(id) {
		const rta = await this.api.patch(`/payment/${id}`);
		return rta.data
	}
	async updateChangePayment(id, previousPaymentMethod, payment) {
		try {

			const body = {
				previousPaymentMethod: previousPaymentMethod,
				paymentMethod: payment
			}

			const rta = await this.api.patch(`/paymentMethod/${id}`, body);
			return rta.data
		} catch (error) {
			throw error?.response?.data
		}
	}
}

export { OrderService }