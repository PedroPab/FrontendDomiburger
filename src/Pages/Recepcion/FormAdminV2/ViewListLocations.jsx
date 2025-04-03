import { useEffect, useState } from "react";
import { Col, Row, Container, Spinner, Alert, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import CardCreate from "../../../components/common/CardCreate";
import ReusableModal from "../../../components/common/ReusableModal";
import { CreateLocationComponent } from "../../User/CreateLocation";
import { useFindLocationsByIdClient } from "../../../hooks/api/useFindLocationsByIdClient";
import { LocationCard } from "../../../components/Locations/LocationCard";

const ViewListLocations = ({
	locationIdSelect,
	setLocationIdSelect,
	clientId,
	userId,
	dataClient,
}) => {
	// Hook personalizado para obtener las ubicaciones
	const { locations, loading, error, findLocationsByIdClient } =
		useFindLocationsByIdClient();

	const [showModal, setShowModal] = useState(false);

	// Cuando 'clientId' cambia, cargamos ubicaciones
	useEffect(() => {
		if (clientId) {
			findLocationsByIdClient(clientId);
		} else if (userId) {
			// Aquí podrías usar otra función para encontrar ubicaciones por usuario
		}
	}, [clientId, userId, dataClient]);

	// Si no hay dataClient, muestra algo por defecto (opcional)
	useEffect(() => {
		if (!dataClient) {
			findLocationsByIdClient(null);
		}
	}, [dataClient]);

	const openCreateLocationClient = () => {
		toast.info("Abriendo formulario de creación de ubicación...");
		setShowModal(true);
	};

	const successForm = () => {
		toast.success("¡Ubicación creada exitosamente!");
		setShowModal(false);
		// Recargamos la lista de ubicaciones
		findLocationsByIdClient(clientId);
	};

	// Ejemplo de submit del formulario para confirmar la ubicación seleccionada
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!locationIdSelect) {
			toast.warning("Seleccione una ubicación antes de continuar.");
			return;
		}
		toast.success(`Has seleccionado la ubicación con ID: ${locationIdSelect}`);
		// Aquí podrías llamar a alguna función para guardar o procesar la selección
	};

	return (
		<Container className="my-4">
			<h2 className="text-center mb-4">Gestión de Ubicaciones</h2>

			{/* Convertimos todo en un formulario */}
			<Form onSubmit={handleSubmit} aria-label="Selección de ubicaciones">
				<div style={{ maxHeight: "500px", overflowY: "auto" }}>
					{loading && (
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ minHeight: "150px" }}
						>
							<Spinner animation="border" variant="primary" role="status">
								<span className="visually-hidden">Cargando...</span>
							</Spinner>
						</div>
					)}

					{error && (
						<Alert variant="danger" className="text-center">
							{error}
						</Alert>
					)}

					{!loading && !error && (
						<>
							{locations?.length === 0 && (
								<Alert variant="info" className="text-center">
									No hay ubicaciones registradas.
								</Alert>
							)}

							<Row className="gy-4">
								{/* Tarjeta para crear ubicación */}
								<Col xs={12} sm={6} md={4}>
									<CardCreate
										handleCardClick={openCreateLocationClient}
										messageText="Crear nueva ubicación"
									/>
								</Col>

								{/* Render de ubicaciones como radios */}
								{locations?.map((location) => (
									<Col key={location.id} xs={12} sm={6} md={4}>
										<Form.Check
											type="radio"
											name="locationsGroup" // mismo nombre para que funcionen como grupo
											id={`location-${location.id}`}
											value={location.id}
											// Si coincide con el seleccionado en el estado
											checked={locationIdSelect === location.id}
											// Actualiza el seleccionado al cambiar
											onChange={() => setLocationIdSelect(location.id)}
											// Usa label para renderizar tu card
											label={
												<LocationCard
													location={location}
													isSelect={locationIdSelect === location.id}
													onEdit={() => {
														// Lógica para editar, si fuera necesario
													}}
												/>
											}
										/>
									</Col>
								))}
							</Row>
						</>
					)}
				</div>

				{/* Botón para enviar el formulario (ej. confirmar selección) */}
				<div className="text-end mt-3">
					<Button type="submit" variant="primary">
						Guardar selección
					</Button>
				</div>
			</Form>

			{/* Modal para crear nueva ubicación */}
			<ReusableModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				title="Crear nueva ubicación"
			>
				<CreateLocationComponent successForm={successForm} clientId={clientId} />
			</ReusableModal>
		</Container>
	);
};

export { ViewListLocations };
