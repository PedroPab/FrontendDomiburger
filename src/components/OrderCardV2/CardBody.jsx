import { Accordion, Alert, Card } from "react-bootstrap";
import { LocationInfoOrderCard } from "./LocationInfoOrderCard";

function CardBodyComponent({ data }) {
	const orderItems = data?.orderItems;
	const comment = data?.comment;
	const address = data?.address;
	const locationId = data?.locationId;

	return (
		<Card.Body>
			{/* comentario del ciente */}
			{comment &&
				<Alert variant="warning">
					{comment}
				</Alert>
			}

			<LocationInfoOrderCard locationId={locationId} />


			{/* productos */}
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>{"producots"}</Accordion.Header>
					<Accordion.Body>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Card.Body>
	);
}

export default CardBodyComponent;
