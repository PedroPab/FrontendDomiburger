import { useState, useEffect } from "react";
import { Table, Badge, Button, ListGroup } from "react-bootstrap";
import { RECEPCION_ROUTES } from "../../Utils/const/namesRutes";
import { statusOrderCol } from "../../Utils/listStatus";
import { useClientFindById } from "../../hooks/api/clients/useClientFindById";
import { useUserFindById } from "../../hooks/api/users/useUserFindById";
import { NameAndPhoto } from "../common/users/NameAndPhoto";
import { useWorker } from "../../Context/WorkerContext";
import { ResumedItems } from "../common/products/ResumedItems";

const OrderRow = ({ order }) => {
	const [open, setOpen] = useState(false);
	const colorStatus = statusOrderCol[order?.status]?.color || "#000000";

	// Consultamos el cliente y el repartidor
	const { data: clientData, fetchClient } = useClientFindById();
	const { data: userData, fetchUser } = useUserFindById();

	useEffect(() => {
		if (order.clientId) fetchClient(order.clientId);
		if (order.assignedCourierUserId) fetchUser(order.assignedCourierUserId);
	}, [order.clientId, order.assignedCourierUserId, fetchClient, fetchUser]);

	// Resumimos los productos usando el hook correspondiente
	const { listProducts } = useWorker();
	const { component: resumedItems, hasComplements } = ResumedItems(order?.orderItems, listProducts);

	return (
		<>
			{/* Fila principal de la orden */}
			<tr>
				<td>#{order.dailyOrderNumber}</td>
				<td>
					{new Date(order.createdAt).toLocaleDateString("es-ES", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
					})}
				</td>
				<td>
					<Badge
						style={{
							backgroundColor: colorStatus,
							color: "white",
							fontSize: "0.85rem",
							padding: "5px 10px",
						}}
					>
						{statusOrderCol[order?.status].label}
					</Badge>
				</td>
				<td>
					{clientData && (
						<NameAndPhoto name={clientData.name} photo={clientData.photoUrl} />
					)}
				</td>
				<td>
					{userData && (
						<NameAndPhoto name={userData.name} photo={userData.photoUrl} />
					)}
				</td>
				<td>
					{resumedItems} {hasComplements && <Badge bg="danger">!!!</Badge>}
				</td>
				<td>
					<strong>${order.totalPrice.toLocaleString()}</strong>
				</td>
				<td>{order.paymentMethod}</td>
				<td>
					<Badge bg={order.payment?.status === "approved" ? "primary" : "secondary"}>
						{order.payment?.status || "N/A"}
					</Badge>
				</td>
				<td>
					<Button variant="link" onClick={() => setOpen(!open)}>
						{open ? "Ocultar" : "Detalles"}
					</Button>
					<a
						href={`${RECEPCION_ROUTES.routes.PEDIDOS_DETAIL}/${order.id}`}
						target="_blank"
						rel="noreferrer"
					>
						Ver Detalles
					</a>
				</td>
			</tr>

			{/* Fila de detalle, visible al hacer clic en "Detalles" */}
			{open && (
				<tr>
					<td colSpan="10">
						<div className="p-2">
							<div className="mb-2">
								<strong>Distancia:</strong>{" "}
								{order.delivery.distance > 0 ? `${order.delivery.distance}m` : "N/A"}
							</div>
							<div className="mb-2">
								<strong>Costo de Entrega:</strong> ${order.delivery.price.toLocaleString()}
							</div>
							<div className="mb-2">
								<strong>Productos:</strong>
								<ListGroup className="mt-1">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index} className="d-flex justify-content-between">
											<span>Producto ID: {item.id}</span>
											<strong>${item.price.toLocaleString()}</strong>
										</ListGroup.Item>
									))}
								</ListGroup>
							</div>
							{order.comment && (
								<div className="mb-2">
									<strong>Comentario:</strong> {order.comment}
								</div>
							)}
							<div>
								<strong>Repartidor Asignado:</strong>{" "}
								{order.assignedCourierUserId || "No asignado"}
							</div>
						</div>
					</td>
				</tr>
			)}
		</>
	);
};

export { OrderRow };
