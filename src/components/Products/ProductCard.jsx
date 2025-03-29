import { Card, Button, Badge, ListGroup } from 'react-bootstrap';
import imgDefault from "../../assets/img/photoGeneric.jpg";

const ProductCard = ({ element }) => {
	// Asignar la imagen: se utiliza la primera foto o la imagen por defecto
	const imageUrl = element?.photos?.[0] || imgDefault;

	return (
		<Card className="shadow-sm h-100">
			<Card.Img
				variant="top"
				src={imageUrl}
				alt={element.name}
				className="img-fluid"
				style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
			/>

			<Card.Body>
				<Card.Title className="text-center">{element.name}</Card.Title>

				{/* Si el elemento tiene la propiedad "secret", se muestra el distintivo */}
				{element.secret && (
					<div className="d-flex justify-content-center mb-2">
						<Badge bg="warning" className="text-dark">Secreto</Badge>
					</div>
				)}

				<Card.Text className="text-muted">{element.description}</Card.Text>
				<Card.Text className="fw-bold text-primary">
					Precio: ${element.price.toLocaleString()}
				</Card.Text>

				<div className="text-center my-2">
					<Badge bg={element.status === "active" ? "success" : "danger"}>
						{element.status}
					</Badge>
				</div>

				<ListGroup variant="flush" className="mt-3">
					<ListGroup.Item>
						<strong>Tipo:</strong> {element.type}
					</ListGroup.Item>
				</ListGroup>

				<div className="mt-3">
					<Button variant="primary" className="w-100">Ver detalles</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export { ProductCard };
