import { useEffect, useState } from "react";
import { LocationsService } from "../../../apis/clientV2/LocationsService";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce";
import { useAuth } from "../../../Context/AuthContext";
import CardCreate from "../../../components/common/CardCreate";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import ReusableModal from "../../../components/common/ReusableModal";
import { CreateLocationComponent } from "../../User/CreateLocation";

const ViewListLocations = ({ locationIdSelect, setLocationIdSelect, clientId, userId }) => {
	const { token } = useAuth();
	const [locations, setLocations] = useState([]);
	const [loadingLocations, setLoadingLocations] = useState(false);
	const locationsService = new LocationsService(token);

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
			// findLocationsByIdUser(userId)
		}
	}, [clientId, userId]);

	const [showModal, setShowModal] = useState(false);

	const openCreateLocationClient = () => {
		toast.success("Creando ubicación...");
		setShowModal(true);
	};

	const successForm = () => {
		toast.success("¡Ubicación creada exitosamente!");
		setShowModal(false);
		findLocationsByIdClient(clientId);
	};

	return (
		<div style={{ maxHeight: "400px", overflowY: "auto" }}>
			{loadingLocations && <p>Cargando...</p>}
			{!loadingLocations && locations.length === 0 && <p>No hay ubicaciones</p>}
			<Row className="gy-3">
				<Col xs={12} md={6} lg={4}>
					<CardCreate
						handleCardClick={openCreateLocationClient}
						messageText="Crear una ubicación al cliente"
					/>
				</Col>
				{locations.map((location) => {
					console.log(location)
					return (
						<Col key={location.id} xs={12} md={6} lg={4}>
							<LocationCardReduce
								location={location}
								isSelect={location.id === locationIdSelect}
								onClick={() => setLocationIdSelect(location.id)}
							/>
						</Col>
					)
				})}
			</Row>
			<ReusableModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				title="Crear nueva ubicación"
			>
				<CreateLocationComponent successForm={successForm} clientId={clientId} />
			</ReusableModal>
		</div>
	);
};

export { ViewListLocations };
