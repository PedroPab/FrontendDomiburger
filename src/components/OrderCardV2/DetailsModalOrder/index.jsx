import { Modal, Button } from "react-bootstrap";
import { ButtonDeleteOrder } from "./ButtonDeleteOrder";
import { ButtonChangeKitchen } from "./ButtonChangeKitchen";
import { OrderTimeline } from "./OrderTimeline";

const DetailsModalOrder = ({ showModal, setShowModal, order }) => {
	if (!order) return null; // Si no hay orden, no renderiza el modal

	return (
		<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>Detalles del Pedido #{order.dailyOrderNumber}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* Información Principal */}
				<h5>Información del Pedido</h5>
				{/* id */}
				<h6> id: {order.id}</h6>

				<OrderTimeline
					createdAt={order.createdAt.seconds ? order.createdAt.toDate() : order.createdAt}
					timeLapseStatus={order.timeLapseStatus}
					status={order.status}
				/>

				{/* boton para elimiar el pedido */}
				<ButtonDeleteOrder id={order.id} changeSucceed={() => setShowModal(false)} />

				{/* boton para cambiar la cocina */}
				<ButtonChangeKitchen id={order.id} changeSucceed={() => setShowModal(false)} />

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setShowModal(false)}>
					Cerrar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export { DetailsModalOrder };
