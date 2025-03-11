import { Accordion, Row, Col, ListGroup, Badge } from "react-bootstrap";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";
import { toast } from "react-toastify";
import { OrderService } from "../../apis/clientV2/OrderService";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react"; // se importa useState

const PaymentInfoOrder = ({ data }) => {
	const { totalPrice, delivery, paymentMethod, payment } = data;
	const { token } = useAuth();
	const orderService = new OrderService(token);

	// Estado para gestionar la carga de la petición
	const [loading, setLoading] = useState(false);

	// Función para aprobar el pago
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

	const approvePayment = () => {
		updatePayment(data.id);
	};

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					<div className="w-100 d-flex justify-content-between align-items-center">
						<span className="fw-bold text-primary fs-5">{paymentMethod}</span>
						<Badge bg="success" className="fs-6">
							{formatearNumeroConPuntos(totalPrice)}
						</Badge>
					</div>
				</Accordion.Header>
				<Accordion.Body>
					<ListGroup variant="flush">
						<ListGroup.Item className="border-0 py-2">

							<hr className="my-2" />

							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Envío:</Col>
								<Col xs={6} className="text-end fw-semibold">
									{formatearNumeroConPuntos(delivery.price)}
								</Col>
							</Row>

							<hr className="my-2" />

							{/* total de los productos */}
							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Productos:</Col>
								<Col xs={6} className="text-end fw-semibold">
									{formatearNumeroConPuntos(totalPrice - delivery.price)}
								</Col>
							</Row>

							<hr className="my-2" />

							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Total:</Col>
								<Col xs={6} className="text-end fw-semibold text-success">
									{formatearNumeroConPuntos(totalPrice)}
								</Col>
							</Row>

							<hr className="my-2" />
							<hr className="my-2" />

							<Row className="mb-2">
								<Col xs={8} className="text-secondary">Estado del pago:</Col>
								<Col xs={4} className="text-end fw-semibold">
									{payment.status === "approved" ? (
										<Badge bg="success">Aprobado</Badge>
									) : (
										<Badge bg="danger">Esperando</Badge>
									)}
								</Col>
							</Row>

							{/* Botón para aprobar el pago */}
							{payment.status !== "approved" && (
								<button
									className="btn btn-warning w-100"
									onClick={approvePayment}
									disabled={loading} // se desactiva el botón mientras se carga
								>
									{loading ? "Cargando..." : "Aprobar pago"}
								</button>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export { PaymentInfoOrder };
