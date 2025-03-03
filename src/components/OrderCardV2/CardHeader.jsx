import { memo, useEffect, useState } from "react";
import { Card, Badge, Image, Spinner, OverlayTrigger, Popover, Button, Modal } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UsersService } from "../../apis/clientV2/usersService";
import { ClientsService } from "../../apis/clientV2/ClientsService";

import photoGeneric from "../../assets/img/photoGeneric.jpg";

const CardHeaderComponent = memo(function Greeting({ userId, dailyOrderNumber, clientId }) {
	const [userClient, setUserClient] = useState(null);
	const [loadUserClient, setLoadUserClient] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const { token } = useAuth();
	const usersService = new UsersService(token);
	const clientsService = new ClientsService(token);

	useEffect(() => {
		const findUser = async () => {
			let user
			if (userId) {
				user = await usersService.getByIdUser(userId);
			} else if (clientId) {
				user = await clientsService.getById(clientId);
			}
			setUserClient(user.body);
			setLoadUserClient(false);
		};
		setLoadUserClient(true);
		findUser();
	}, [token, userId]);

	const userName = userClient?.name;
	const profilePicture = userClient?.photoUrl;
	const orderNumber = dailyOrderNumber;

	const popover = (
		<Popover id="popover-profile">
			<Popover.Header as="h3">{userName || "Sin nombre"}</Popover.Header>
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

	const handleModalClose = () => setShowModal(false);
	const handleModalShow = () => setShowModal(true);

	return (
		<>
			<Card.Header className="d-flex justify-content-between align-items-center">
				{/* Sección izquierda: nombre de usuario y número de pedido */}
				<Badge
					variant="info" onClick={handleModalShow}
					className="d-flex align-items-center rounded-pill"
					style={{ fontSize: "1rem", padding: "0.5rem 0.7rem" }}>
					<small>{orderNumber || "#"}</small>
				</Badge>

				<h5 className="mb-0 ml-2">
					{loadUserClient ? <Spinner animation="border" size="sm" /> : (userName || "Sin nombre")}
				</h5>

				{/* Sección derecha: foto de perfil y botón de más info */}
				<div className="d-flex align-items-center">
					{loadUserClient ? (
						<Spinner animation="border" size="sm" />
					) : (
						<OverlayTrigger trigger="click" placement="auto" overlay={popover} container={document.body}>
							<Image
								src={profilePicture || photoGeneric}
								alt="Foto de perfil del usuario actual"
								className="rounded-circle"
								width="40"
								height="40"
								style={{ cursor: "pointer" }}
							/>
						</OverlayTrigger>
					)}
				</div>
			</Card.Header>

			{/* Modal para mostrar más detalles */}
			<Modal show={showModal} onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Detalles del Pedido #{orderNumber}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Aquí puedes agregar más detalles del pedido.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleModalClose}>
						Cerrar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
});

export default CardHeaderComponent;
