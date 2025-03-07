import { useEffect, useState } from "react";
import { LocationsService } from "../../../apis/clientV2/LocationsService";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce";
import { useAuth } from "../../../Context/AuthContext";
import CardCreate from "../../../components/common/CardCreate";
import { toast } from "react-toastify";
import { Col, Row, Container, Spinner, Alert } from "react-bootstrap";
import ReusableModal from "../../../components/common/ReusableModal";
import { CreateLocationComponent } from "../../User/CreateLocation";

const ViewListLocations = ({ locationIdSelect, setLocationIdSelect, clientId, userId }) => {
	const { token } = useAuth();
	const [locations, setLocations] = useState([]);
	const [loadingLocations, setLoadingLocations] = useState(false);
	const locationsService = new LocationsService(token);

	useEffect(() => {
		if (!clientId) {
			setLocations([]);
		}
	}, [clientId]);

	const findLocationsByIdClient = async (idClient) => {
		setLoadingLocations(true);
		try {
			const rta = await locationsService.getByIdClient(idClient);
			setLocations(rta.body || []);
			return rta.body;
		} catch (error) {
			toast.error("Error al cargar ubicaciones");
		} finally {
			setLoadingLocations(false);
		}
	};

	useEffect(() => {
		if (clientId) {
			findLocationsByIdClient(clientId);
		} else if (userId) {
			// Aquí podrías implementar la función para obtener ubicaciones por usuario
		}
	}, [clientId, userId]);

	const [showModal, setShowModal] = useState(false);

	const openCreateLocationClient = () => {
		toast.info("Abriendo formulario de creación de ubicación...");
		setShowModal(true);
	};

	const successForm = () => {
		toast.success("¡Ubicación creada exitosamente!");
		setShowModal(false);
		findLocationsByIdClient(clientId);
	};

	return (
		<Container className="my-4">
			<h2 className="text-center mb-4">Gestión de Ubicaciones</h2>
			<div style={{ maxHeight: "300px", overflowY: "auto" }}>
				{loadingLocations ? (
					<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "150px" }}>
						<Spinner animation="border" variant="primary" role="status">
							<span className="visually-hidden">Cargando...</span>
						</Spinner>
					</div>
				) : (
					<>
						{locations.length === 0 && (
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
							{locations.map((location) => (
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
