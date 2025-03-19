import { useEffect, useState } from "react";
import { OrderService } from "../../../../apis/clientV2/OrderService";
import { useAuth } from "../../../../Context/AuthContext";
import { useMiContexto } from "../../../../Context";

const useOrdersDay = (startDate, endDate) => {
	//transformamos la fecha a un formato que acepta el backend con solo el dia , mes y año
	console.log('esto son las fechas', startDate, endDate)

	const { token } = useAuth()
	const orderService = new OrderService(token);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const [ordenes, setOrdenes] = useState([]);

	const { kitchenSelectId: kitchenId } = useMiContexto()
	const fetchOrders = async () => {
		setLoading(true);
		try {
			const response = await orderService.getOrdersDay({ kitchenId, startDate, endDate });
			setOrdenes(response);
			console.log("🚀 ~ fetchOrders ~ response:", response)
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

export { useOrdersDay }