import { useState } from "react";
import { KitchenService } from "../../../apis/clientV2/KitchenService";
import { useAuth } from "../../../Context/AuthContext";

const useGetKitchenByLocation = () => {
	const { token } = useAuth()
	const service = new KitchenService(token);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);

	const fetchKitchen = async (locationId, kitchenId) => {
		setLoading(true);
		try {

			const response = await service.getSelectKitchen(locationId, kitchenId);
			setData(response.data.body);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	}

	return {
		error: error,
		data: data,
		loading: loading,
		fetchKitchen
	}
}

export { useGetKitchenByLocation }