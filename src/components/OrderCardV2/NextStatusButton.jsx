import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { statusNext } from "../../Utils/const/statusChange/listNextStatus";
import { OrderService } from "../../apis/clientV2/OrderService";
import { statusOrderCol } from "../../Utils/listStatus";
import { useAuth } from "../../Context/AuthContext";
import { ConfirmActionButton } from "./../common/ConfirmActionButton";

function NextStatusButton({ data }) {
	const { token } = useAuth();
	const orderService = new OrderService(token);

	// Se obtiene el label del botón a partir del estado actual de la orden.
	const buttonLabel = statusOrderCol[data.status]?.textNextStatus || "Change Status";

	const [isLoading, setIsLoading] = useState(false);

	const nextStatus = useCallback(async () => {
		const id = data.id;
		const previousState = data.status;
		const nextState = statusNext(data);
		setIsLoading(true);
		try {
			await orderService.changeStatus(id, previousState, nextState);
			toast.success("Order status updated");
		} catch (error) {
			console.error("Error updating order status:", error);
			toast.error(`Error changing order status: ${error?.message}`);
		} finally {
			setIsLoading(false);
		}
	}, [data.id, data.status, orderService]);

	return (
		<ConfirmActionButton
			buttonLabel={buttonLabel}
			isLoading={isLoading}
			onConfirm={nextStatus}
			variant="primary"
			confirmVariant="success"
			cancelVariant="danger"
		/>
	);
}

export { NextStatusButton };
