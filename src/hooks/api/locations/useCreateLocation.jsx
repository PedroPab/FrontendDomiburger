import { useState } from "react";
import { LocationsService } from "../../../apis/clientV2/LocationsService";
import { useAuth } from "../../../Context/AuthContext";

const useCreateLocation = () => {
	const { token } = useAuth()
	const service = new LocationsService(token);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);

	const sendLocation = async (data) => {
		let rta
		setLoading(true);
		try {
			const response = await service.create(data);
			setData(response.data);
			rta = response.data
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
		return rta
	}

	return {
		error,
		data,
		loading,
		sendLocation
	}
}



export { useCreateLocation }