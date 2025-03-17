import { useState, useCallback } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { statusNext } from "../../Utils/const/statusChange/listNextStatus";
import { OrderService } from "../../apis/clientV2/OrderService";
import { statusOrderCol } from "../../Utils/listStatus";
import { useAuth } from "../../Context/AuthContext";

function NextStatusButton({ data }) {
	const { token } = useAuth();
	const orderService = new OrderService(token);

	const nameStatus = statusOrderCol[data.status]?.textNextStatus || null;

	const [loadChangeStatus, setLoadChangeStatus] = useState(false);
	const [confirming, setConfirming] = useState(false);

	const nextStatus = useCallback(async () => {
		const id = data.id;
		const previousState = data.status;
		const nextState = statusNext(previousState);
		setLoadChangeStatus(true);
		try {
			await orderService.changeStatus(id, previousState, nextState);
			toast.success("Estado de la orden actualizado");
		} catch (error) {
			console.error("Error al actualizar el estado:", error);
			toast.error(`Error al cambiar el estado de la orden: ${error?.message}`);
		} finally {
			setLoadChangeStatus(false);
		}
	}, [data.id, data.status, orderService]);

	return (
		<div className="d-flex gap-2">
			{confirming ? (
				<>
					<Button variant="success" onClick={nextStatus} disabled={loadChangeStatus}>
						{loadChangeStatus ? <Spinner animation="border" size="sm" /> : "Aceptar"}
					</Button>
					<Button variant="danger" onClick={() => setConfirming(false)} disabled={loadChangeStatus}>
						Cancelar
					</Button>
				</>
			) : (
				<Button variant="primary" onClick={() => setConfirming(true)} disabled={loadChangeStatus}>
					{loadChangeStatus ? <Spinner animation="border" size="sm" /> : nameStatus || "Cambiar estado"}
				</Button>
			)}
		</div>
	);
}

export { NextStatusButton };
