import { useMemo, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { OrderService } from "../../apis/clientV2/OrderService";

const useChangeKitchen = () => {
	const { token } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const orderService = useMemo(() => new OrderService(token), [token]);

	const changeKitchen = async (id, kitchenIdSelect) => {
		setLoading(true);
		try {
			const rta = await orderService.updateKitchen(id, kitchenIdSelect);
			setData(rta);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return { changeKitchen, loading, error, data };
}

export { useChangeKitchen };