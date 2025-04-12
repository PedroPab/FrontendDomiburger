// hooks/usePaymentActions.js
import { useState } from "react";
import { toast } from "react-toastify";
import { OrderService } from "../../../apis/clientV2/OrderService";
import { useAuth } from "../../../Context/AuthContext";

export const usePaymentActions = () => {
	const { token } = useAuth();
	const [loading, setLoading] = useState(false);
	const orderService = new OrderService(token);

	const updatePayment = async (id) => {
		setLoading(true);
		try {
			const response = await orderService.updatePayment(id);
			toast.success(response.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const updateChangePayment = async (id, previousPaymentMethod, newPayment) => {
		setLoading(true);
		try {
			const response = await orderService.updateChangePayment(
				id,
				previousPaymentMethod,
				newPayment
			);
			toast.success(response.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { updatePayment, updateChangePayment, loading };
};
