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
		setLoading(true);
		try {
			const response = await service.create(data);
			setData(response.data);
			const rta = response.data
			setLoading(false);
			return rta
		} catch (error) {
			setLoading(false);
			setError(error);
			throw new Error(error.message);
		}
	}

	const sendLocationAnonymous = async (data) => {
		setLoading(true);
		try {
			const response = await service.createPublic(data);
			setData(response.data);
			setLoading(false);
			const rta = response.data
			return rta
		} catch (error) {
			setLoading(false);
			setError(error.message);
			throw new Error(error);
		}
	}

	return {
		error,
		data,
		loading,
		sendLocation,
		sendLocationAnonymous,
	}
}



export { useCreateLocation }