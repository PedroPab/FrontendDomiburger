import { useState } from "react";
import { OrderService } from "../../../../apis/clientV2/OrderService";
import { useAuth } from "../../../../Context/AuthContext";

const useOrderHistory = () => {
	//transformamos la fecha a un formato que acepta el backend con solo el dia , mes y año

	const { token, usuarioActual } = useAuth()


	const orderService = new OrderService(token);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const [ordenes, setOrdenes] = useState([]);

	const fetchOrders = async (startDate, endDate) => {
		const userCreateId = usuarioActual?.uid

		setLoading(true);
		try {
			const response = await orderService.getOrdersByUserCreate({ userCreateId, startDate, endDate });
			setOrdenes(response);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	}


	return {
		error: error,
		data: ordenes,
		loading: loading,
		fetchOrders
	}

}

export { useOrderHistory }