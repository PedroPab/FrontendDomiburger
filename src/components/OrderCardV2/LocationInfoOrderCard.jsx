import { Accordion } from "react-bootstrap";
import { LocationsService } from "../../apis/clientV2/LocationsService";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LocationInfoOrderCard = ({ locationId }) => {
	//hacemos la peticion para obtener la informacion de la ubicacion
	const { token } = useAuth();
	const locationService = new LocationsService(token);
	const [location, setLocation] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const findLocation = async () => {
		try {
			setLoading(true);
			const location = await locationService.getById(locationId);
			console.log("🚀 ~ findLocation ~ location:", location)
			setLocation(location.body);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}
	useEffect(() => {
		findLocation();
	}, [locationId]);

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>{location?.address}</Accordion.Header>
				<Accordion.Body>
					<p><strong>Property Type:</strong> {location?.propertyType}</p>
					<p><strong>Floor:</strong> {location?.floor}</p>
					<p><strong>Comment:</strong> {location?.comment}</p>
					{/* ver mas detalles */}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export { LocationInfoOrderCard };