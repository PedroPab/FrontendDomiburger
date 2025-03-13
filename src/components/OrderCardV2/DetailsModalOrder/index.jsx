import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { ButtonDeleteOrder } from "./ButtonDeleteOrder";
import { ButtonChangeKitchen } from "./ButtonChangeKitchen";

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
				<Table striped bordered hover>
					<tbody>
						<tr>
							<td><strong>ID del Pedido:</strong></td>
							<td>{order.id}</td>
						</tr>
						<tr>
							<td><strong>Estado:</strong></td>
							<td>{order.status}</td>
						</tr>
						<tr>
							<td><strong>Método de pago:</strong></td>
							<td>{order.paymentMethod === "credit_card" ? "Tarjeta de crédito" : order.paymentMethod}</td>
						</tr>
						<tr>
							<td><strong>Comentario:</strong></td>
							<td>{order.comment || "Sin comentarios"}</td>
						</tr>
						<tr>
							<td><strong>Precio total:</strong></td>
							<td>${order.totalPrice.toLocaleString()}</td>
						</tr>
					</tbody>
				</Table>

				{/* Información de Entrega */}
				<h5 className="mt-4">Detalles de la Entrega</h5>
				<Table striped bordered hover>
					<tbody>
						<tr>
							<td><strong>Distancia:</strong></td>
							<td>{order.delivery.distance} metros</td>
						</tr>
						<tr>
							<td><strong>Duración estimada:</strong></td>
							<td>{Math.round(order.delivery.duration / 60)} minutos</td>
						</tr>
						<tr>
							<td><strong>Costo de envío:</strong></td>
							<td>${order.delivery.price.toLocaleString()}</td>
						</tr>
						<tr>
							<td><strong>Tiempo estimado de entrega:</strong></td>
							<td>{new Date(order.estimatedDeliveryTime).toLocaleString()}</td>
						</tr>
						<tr>
							<td><strong>ID de Ubicación:</strong></td>
							<td>{order.locationId}</td>
						</tr>
					</tbody>
				</Table>

				{/* Productos en la Orden */}
				<h5 className="mt-4">Productos</h5>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Cantidad</th>
							<th>Precio Unitario</th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{order.orderItems.map((item) => (
							<React.Fragment key={item.id}>
								<tr>
									<td>{item.id}</td>
									<td>{item.quantity}</td>
									<td>${item.price.toFixed(2)}</td>
									<td>${(item.price * item.quantity).toFixed(2)}</td>
								</tr>
								{item.complements?.length > 0 && (
									<tr>
										<td colSpan="4">
											<strong>Complementos:</strong>
											<ul>
												{item.complements.map((comp) => (
													<li key={comp.id}>
														ID: {comp.id} - {comp.quantity} x ${comp.price.toFixed(2)} = ${(
															comp.quantity * comp.price
														).toFixed(2)}
													</li>
												))}
											</ul>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</Table>

				{/* Información del Usuario y Cocina */}
				<h5 className="mt-4">Detalles Adicionales</h5>
				<Table striped bordered hover>
					<tbody>
						<tr>
							<td><strong>ID del Usuario:</strong></td>
							<td>{order.userId}</td>
						</tr>
						<tr>
							<td><strong>ID del Creador:</strong></td>
							<td>{order.userCreateId}</td>
						</tr>
						<tr>
							<td><strong>ID del Cocinero Asignado:</strong></td>
							<td>{order.assignedKitchenId || "No asignado"}</td>
						</tr>
						<tr>
							<td><strong>ID del Domiciliario Asignado:</strong></td>
							<td>{order.assignedCourierUserId || "No asignado"}</td>
						</tr>
					</tbody>
				</Table>

				{/* Historial de Tiempos */}
				<h5 className="mt-4">Historial de Estado</h5>
				<Table striped bordered hover>
					<tbody>
						<tr>
							<td><strong>Creado en:</strong></td>
							<td>{new Date(order.createAt).toLocaleString()}</td>
						</tr>
						<tr>
							<td><strong>Última actualización:</strong></td>
							<td>{new Date(order.updateAt).toLocaleString()}</td>
						</tr>
					</tbody>
				</Table>

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
