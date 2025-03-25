import { useEffect, useState } from "react";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce";
import CardCreate from "../../../components/common/CardCreate";
import { toast } from "react-toastify";
import { Col, Row, Container, Spinner, Alert } from "react-bootstrap";
import ReusableModal from "../../../components/common/ReusableModal";
import { CreateLocationComponent } from "../../User/CreateLocation";
// Importa el custom hook; ajusta la ruta según corresponda
import { useFindLocationsByIdClient } from "../../../hooks/api/useFindLocationsByIdClient";

const ViewListLocations = ({ locationIdSelect, setLocationIdSelect, clientId, userId, dataClient }) => {
	// Usamos el custom hook para manejar la obtención de ubicaciones y su estado
	const { locations, loading, error, findLocationsByIdClient } = useFindLocationsByIdClient();

	const [showModal, setShowModal] = useState(false);

	// Si clientId cambia y es válido, se actualizan las ubicaciones
	useEffect(() => {
		if (clientId) {
			findLocationsByIdClient(clientId);
		} else if (userId) {
			// Aquí podrías implementar la función para obtener ubicaciones por usuario
		}
	}, [clientId, userId, dataClient]);

	useEffect(() => {
		if (!dataClient) {
			setLocationIdSelect(null);
		}
	}, [dataClient]);

	const openCreateLocationClient = () => {
		toast.info("Abriendo formulario de creación de ubicación...");
		setShowModal(true);
	};

	const successForm = () => {
		toast.success("¡Ubicación creada exitosamente!");
		setShowModal(false);
		// Actualiza la lista de ubicaciones tras crear una nueva
		findLocationsByIdClient(clientId);
	};

	return (
		<Container className="my-4">
			<h2 className="text-center mb-4">Gestión de Ubicaciones</h2>
			<div style={{ maxHeight: "300px", overflowY: "auto" }}>
				{loading ? (
					<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "150px" }}>
						<Spinner animation="border" variant="primary" role="status">
							<span className="visually-hidden">Cargando...</span>
						</Spinner>
					</div>
				) : (
					<>
						{locations?.length === 0 && (
							<Alert variant="info" className="text-center">
								No hay ubicaciones registradas.
							</Alert>
						)}
						<Row className="gy-4">
							<Col xs={12} sm={6} md={4}>
								<CardCreate
									handleCardClick={openCreateLocationClient}
									messageText="Crear nueva ubicación"
								/>
							</Col>
							{locations?.map((location) => (
								<Col key={location.id} xs={12} sm={6} md={4}>
									<LocationCardReduce
										location={location}
										isSelect={location.id === locationIdSelect}
										onClick={() => setLocationIdSelect(location.id)}
									/>
								</Col>
							))}
						</Row>
					</>
				)}
			</div>
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
