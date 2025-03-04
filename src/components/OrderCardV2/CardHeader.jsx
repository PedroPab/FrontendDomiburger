import { memo, useEffect, useState } from "react";
import { Card, Badge, Image, Spinner, OverlayTrigger, Popover, Button, Modal } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UsersService } from "../../apis/clientV2/usersService";
import { ClientsService } from "../../apis/clientV2/ClientsService";
import photoGeneric from "../../assets/img/photoGeneric.jpg";
import { DetailsModalOrder } from "./DetailsModalOrder";

const CardHeaderComponent = memo(({ order }) => {
	const { userId, dailyOrderNumber, clientId } = order;
	const [userClient, setUserClient] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const { token } = useAuth();
	const usersService = new UsersService(token);
	const clientsService = new ClientsService(token);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			const user = userId
				? await usersService.getByIdUser(userId)
				: clientId
					? await clientsService.getById(clientId)
					: null;

			setUserClient(user?.body || null);
			setLoading(false);
		};

		if (userId || clientId) fetchUser();
	}, [userId, clientId]);

	const userName = userClient?.name || "Sin nombre";
	const profilePicture = userClient?.photoUrl || photoGeneric;
	const orderNumber = dailyOrderNumber || "#";
	const headerVariant = userId ? "primary" : clientId ? "success" : "secondary";

	const popover = (
		<Popover id="popover-profile">
			<Popover.Header as="h3">{userName}</Popover.Header>
			<Popover.Body>
				<strong>Información del usuario:</strong>
				<p>Email: {userClient?.email || "No disponible"}</p>
				<p>Teléfono: {userClient?.phone || "No disponible"}</p>
				<div className="d-flex justify-content-between">
					<a href={`tel:${userClient?.phone}`} className="btn btn-primary btn-sm">
						Llamar
					</a>
					<a href={`/user/${userClient?.id}`} className="btn btn-secondary btn-sm">
						Ver más detalles
					</a>
				</div>
			</Popover.Body>
		</Popover>
	);



	return (
		<>
			<Card.Header className={`bg-${headerVariant} text-white d-flex justify-content-between align-items-center`}>
				<Badge
					bg="light"
					text="dark"
					onClick={() => setShowModal(true)}
					className="rounded-pill"
					style={{ fontSize: "1rem", padding: "0.5rem 0.7rem", cursor: "pointer" }}
				>
					<small>{orderNumber}</small>
				</Badge>

				<h5 className="mb-0 ml-2">
					{loading ? <Spinner animation="border" size="sm" /> : userName}
				</h5>

				<div className="d-flex align-items-center">
					{loading ? (
						<Spinner animation="border" size="sm" />
					) : (
						<OverlayTrigger trigger="click" placement="auto" overlay={popover}>
							<Image
								src={profilePicture}
								alt="Foto de perfil"
								className="rounded-circle"
								width="40"
								height="40"
								style={{ cursor: "pointer" }}
							/>
						</OverlayTrigger>
					)}
				</div>
			</Card.Header>

			<DetailsModalOrder showModal={showModal} setShowModal={setShowModal} order={order} />

		</>
	);
});

// 🔥 SOLUCIÓN: Agregar displayName manualmente
CardHeaderComponent.displayName = "CardHeaderComponent";

export default CardHeaderComponent;
