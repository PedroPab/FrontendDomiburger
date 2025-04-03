import { useState, useEffect } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { RECEPCION_ROUTES } from "../../Utils/const/namesRutes";
import { statusOrderCol } from "../../Utils/listStatus";
import { useClientFindById } from "../../hooks/api/clients/useClientFindById";
import { useUserFindById } from "../../hooks/api/users/useUserFindById";
import { NameAndPhoto } from "../common/users/NameAndPhoto";
import { useWorker } from "../../Context/WorkerContext";
import { ResumedItems } from "../common/products/ResumedItems";
import { ProductsTable } from "../OrderCardV2/ProductsTable";

const OrderRow = ({ order }) => {
	const [open, setOpen] = useState(false);
	const colorStatus = statusOrderCol[order?.status]?.color || "#000000";

	// Consultamos el cliente y el repartidor
	const { data: clientData, fetchClient } = useClientFindById();
	const { data: userData, fetchUser } = useUserFindById();

	useEffect(() => {
		// Evitar llamadas innecesarias si no hay IDs
		if (order.clientId) fetchClient(order.clientId);
		if (order.assignedCourierUserId) fetchUser(order.assignedCourierUserId);
	}, [order.clientId, order.assignedCourierUserId]);

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
						bg=""
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
						<Details order={order} client={clientData} delivery={order.delivery} user={userData} />
					</td>
				</tr>
			)}
		</>
	);
};

const Details = ({ order, client, delivery, user }) => {
	const { listProducts } = useWorker();
	const { component: resumedItems, hasComplements, products } = ResumedItems(order?.orderItems, listProducts);

	return (
		<div className="p-2">
			{/* Productos */}
			<ProductsTable orderItems={products} />
		</div>
	)
}

export { OrderRow };
