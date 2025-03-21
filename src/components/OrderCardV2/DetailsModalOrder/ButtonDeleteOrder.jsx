import { Button, Spinner } from "react-bootstrap";
import { useAuth } from "../../../Context/AuthContext";
import { OrderService } from "../../../apis/clientV2/OrderService";
import { useState } from "react";
import { toast } from "react-toastify";

const ButtonDeleteOrder = ({ id, changeSucceed }) => {
	const { token } = useAuth();
	const orderService = new OrderService(token);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const deleteOrder = async () => {
		setIsLoading(true);
		try {
			await orderService.delete(id);
			setIsDeleted(true);
			toast.success("Orden eliminada");
			changeSucceed();
		} catch (error) {
			console.error("Error deleting order:", error);
			toast.error(`Error al eliminar la orden: ${error?.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant="danger"
			onClick={() => {
				deleteOrder();
			}}
			disabled={isLoading || isDeleted}
		>
			{isLoading ? <Spinner animation="border" size="sm" /> : isDeleted ? "Eliminado" : "Eliminar"}
		</Button>
	);
}

export { ButtonDeleteOrder };