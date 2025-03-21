import { Accordion, Col, Row, Button, Spinner, Alert } from "react-bootstrap";
import { LocationsService } from "../../apis/clientV2/LocationsService";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCopy, FaMapMarkerAlt } from "react-icons/fa"; // Íconos para mejor UX

const LocationInfoOrderCard = ({ locationId }) => {
	const { token } = useAuth();
	const locationService = new LocationsService(token);
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				setLoading(true);
				const response = await locationService.getById(locationId);
				setLocation(response.body);
			} catch (error) {
				setError("No se pudo cargar la ubicación. Inténtalo de nuevo.");
			} finally {
				setLoading(false);
			}
		};
		fetchLocation();
	}, [locationId]);

	const urlAddress = encodeURIComponent(location?.address);

	// Copiar dirección al portapapeles
	const handleCopyAddress = () => {
		if (location?.address) {
			navigator.clipboard.writeText(location.address);
			toast.success("Dirección copiada al portapapeles.");
		} else {
			toast.error("No hay dirección disponible.");
		}
	};

	// Redirigir a Google Maps
	const handleOpenMaps = () => {
		if (location?.address) {
			window.open(`https://www.google.com/maps/dir/?api=1&destination=${urlAddress}`, "_blank");
		} else {
			toast.error("No hay dirección disponible.");
		}
	};

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>{location?.address || "Ubicación desconocida"}</Accordion.Header>
				<Accordion.Body>
					{loading && (
						<div className="text-center my-3">
							<Spinner animation="border" variant="primary" role="status">
								<span className="visually-hidden">Cargando ubicación...</span>
							</Spinner>
						</div>
					)}

					{error && (
						<Alert variant="danger" className="text-center">
							{error}
						</Alert>
					)}

					{!loading && !error && location && (
						<>
							<Row className="mb-2">
								<Col xs={8} className="text-secondary">Tipo de ubicación:</Col>
								<Col xs={4} className="text-end">
									{location.propertyType || "N/A"}
								</Col>
							</Row>
							<hr className="my-2" />
							<Row className="mb-2">
								<Col xs={4} className="text-secondary">Piso:</Col>
								<Col xs={8} className="text-end">
									{location.floor || "N/A"}
								</Col>
							</Row>
							<hr className="my-3" />

							<div className="d-flex justify-content-between">
								<Button
									variant="outline-secondary"
									size="sm"
									onClick={handleCopyAddress}
									aria-label="Copiar dirección"
								>
									<FaCopy className="me-2" /> Copiar dirección
								</Button>

								<Button
									variant="outline-primary"
									size="sm"
									onClick={handleOpenMaps}
									aria-label="Abrir en Google Maps"
								>
									<FaMapMarkerAlt className="me-2" /> Ver en Maps
								</Button>
							</div>
						</>
					)}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export { LocationInfoOrderCard };
