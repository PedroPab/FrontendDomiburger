
import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { OrderService } from "../../../apis/clientV2/OrderService";

const useOrderFindHistoryByCourier = () => {
	const { token } = useAuth()
	const service = new OrderService(token);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);

	const fetchOrders = async ({ startDate, endDate, id }) => {
		setLoading(true);
		try {
			const response = await service.getOrderByCourier({
				startDate,
				endDate,
				id
			});
			setData(response);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	}

	return {
		error: error,
		data: data,
		loading: loading,
		fetchOrders
	}
}

export { useOrderFindHistoryByCourier }