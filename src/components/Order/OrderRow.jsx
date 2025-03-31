import { Row, Col, Badge, Accordion, ListGroup } from "react-bootstrap";
import { RECEPCION_ROUTES } from "../../Utils/const/namesRutes";
import { statusOrderCol } from "../../Utils/listStatus";
const routes = RECEPCION_ROUTES.routes;

const OrderRow = ({ order }) => {

	const colorStatus = statusOrderCol[order.status].color
	return (
		<Accordion className="border-bottom">
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					<Row className="w-100 align-items-center text-center">
						{/* Número de Orden */}
						<Col xs={6} sm={4} md={2} className="fw-bold">
							#{order.dailyOrderNumber}
						</Col>

						{/* Estado */}
						<Col xs={6} sm={4} md={2}>
							<Badge
								bg=""
								style={{
									backgroundColor: colorStatus,
									color: "white",
									fontSize: "0.85rem",
									padding: "5px 10px",
								}}
								className="text-uppercase">
								{order.status}
							</Badge>
						</Col>

						{/* Total Precio */}
						<Col xs={6} sm={4} md={2}>
							<strong>${order.totalPrice.toLocaleString()}</strong>
						</Col>

						{/* Método de Pago */}
						<Col xs={6} sm={4} md={2} className="text-muted">
							{order.paymentMethod}
						</Col>

						{/* Estado de Pago */}
						<Col xs={6} sm={4} md={2}>
							<Badge bg={order.payment?.status === "approved" ? "primary" : "secondary"}>
								{order.payment?.status || "N/A"}
							</Badge>
						</Col>

						{/* Mas detalles (boton para abir una pestana nueva con la card de esta orden) */}
						<Col xs={12} sm={12} md={2}>
							<a href={`${routes.PEDIDOS_DETAIL}/${order.id}`} target="_blank" rel="noreferrer">
								Ver Detalles
							</a>
						</Col>

					</Row>
				</Accordion.Header>

				<Accordion.Body>
					{/* Sección de Entrega */}
					<Row className="mb-3">
						<Col xs={6} className="fw-bold">Distancia:</Col>
						<Col xs={6}>{order.delivery.distance > 0 ? `${order.delivery.distance}m` : "N/A"}</Col>
					</Row>
					<Row className="mb-3">
						<Col xs={6} className="fw-bold">Costo de Entrega:</Col>
						<Col xs={6}>${order.delivery.price.toLocaleString()}</Col>
					</Row>

					{/* Lista de Productos */}
					<h6>Productos:</h6>
					<ListGroup>
						{order.orderItems.map((item, index) => (
							<ListGroup.Item key={index} className="d-flex justify-content-between">
								<span>Producto ID: {item.id}</span>
								<strong>${item.price.toLocaleString()}</strong>
							</ListGroup.Item>
						))}
					</ListGroup>

					{/* Comentario */}
					{order.comment && (
						<p className="mt-3">
							<strong>Comentario:</strong> {order.comment}
						</p>
					)}

					{/* Repartidor Asignado */}
					<p>
						<strong>Repartidor Asignado:</strong> {order.assignedCourierUserId || "No asignado"}
					</p>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion >
	);
};

export { OrderRow };
