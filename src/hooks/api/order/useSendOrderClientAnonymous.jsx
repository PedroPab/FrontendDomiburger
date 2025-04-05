import { useState } from "react";
import { OrderService } from "../../../apis/clientV2/OrderService";

const useSendOrderClientAnonymous = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	const service = new OrderService();

	const sendOrder = async ({
		delivery,
		kitchenIdSelect,
		comment,
		paymentMethod,
		productOrderList,
		locationIdSelect,
		phone,
		name,
	}) => {
		setIsLoading(true);
		setError(null);
		setResponse(null);

		try {
			const order = {
				delivery,
				kitchenIdSelect,
				comment,
				paymentMethod,
				productOrderList,
				locationIdSelect,
				phone,
				name,
			};

			const response = await service.createPublic(order);
			console.log(`⭐⭐⭐ data del pedido ⭐⭐⭐`, response);
			setResponse(response);
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}

	}

	return {
		isLoading,
		error,
		response,
		sendOrder
	};
}

export { useSendOrderClientAnonymous };
