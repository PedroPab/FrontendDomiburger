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
	async getById(id) {
		try {
			const rta = await this.api.get(`/${id}`)
			return rta.data.body
		} catch (error) {
			throw error.response.data
		}
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
	async getOrdersDay({ kitchenId, startDate, endDate }) {
		try {
			const query = new URLSearchParams();
			query.append('kitchenId', kitchenId);
			query.append('startDate', startDate);
			query.append('endDate', endDate);
			const rta = await this.api.get(`/day?${query.toString()}`)
			return rta.data.body
		} catch (error) {
			throw error.response.data
		}
	}
	async getOrdersByUserCreate({ userCreateId, startDate, endDate }) {
		try {
			const query = new URLSearchParams();
			query.append('startDate', startDate);
			query.append('endDate', endDate);
			const rta = await this.api.get(`/history/${userCreateId}?${query.toString()}`)
			return rta.data.body
		} catch (error) {
			throw error.response.data
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
		try {
			const body = {
				kitchenId: kitchenId
			}
			const rta = await this.api.patch(`/kitchen/${id}`, body);
			return rta.data
		} catch (error) {
			throw error?.response?.data
		}
	}
	async updatePayment(id) {
		try {
			const rta = await this.api.patch(`/payment/${id}`);
			return rta.data
		} catch (error) {
			throw error?.response?.data
		}
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