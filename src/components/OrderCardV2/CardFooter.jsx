import { Card, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { OrderService } from "../../apis/clientV2/OrderService";
import { toast } from "react-toastify";
import { useState } from "react";
import { statusNext } from "../../Utils/const/statusChange/listNextStatus";
import { statusOrderCol } from "../../Utils/listStatus";
import { DeliveryDropdown } from "./DeliveryDropdown";

function CardFooterComponent({ data }) {


	const { token } = useAuth();
	const orderService = new OrderService(token);

	const [loadChangeStatus, setLoadChangeStatus] = useState(false);
	const nextStatus = () => {
		const updateOrderStatus = async () => {
			const id = data.id;
			const previousState = data.status;
			const nextState = statusNext(previousState);
			try {
				await orderService.changeStatus(id, previousState, nextState);

				setLoadChangeStatus(false);
				toast.success("Estado de la orden actualizado");
			} catch (error) {
				console.log("🚀 ~ updateOrderStatus ~ error:", error)
				setLoadChangeStatus(false);
				toast.error(`Error al cambiar el estado de la orden ${error?.response?.data?.message}`);
			}
		};
		setLoadChangeStatus(true);
		updateOrderStatus();
	};

	//consultamos lo datos del 

	const nameStatus = statusOrderCol[data.status]?.label

	return (
		<Card.Footer className="d-flex justify-content-between align-items-center">


			<DeliveryDropdown
				assignedCourierUserId={data?.assignedCourierUserId}
				orderId={data.id}
			/>

			<Button variant="primary" onClick={nextStatus} disabled={loadChangeStatus}>
				{loadChangeStatus ? <Spinner animation="border" size="sm" /> : nameStatus || "Cambiar estado"}
			</Button>
		</Card.Footer>
	);
}

export { CardFooterComponent };
