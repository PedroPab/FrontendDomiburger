import { Accordion, Row, Col, ListGroup, Badge } from "react-bootstrap";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";

const PaymentInfoOrder = ({ data }) => {
	const { totalPrice, delivery, paymentMethod } = data;

	return (
		<Accordion >
			<Accordion.Item eventKey="0">
				<Accordion.Header >
					<div className="w-100 d-flex justify-content-between align-items-center">
						<span className="fw-bold text-primary fs-5">{paymentMethod}</span>
						<Badge bg="success" className="fs-6">
							{formatearNumeroConPuntos(totalPrice)}
						</Badge>
					</div>
				</Accordion.Header>
				<Accordion.Body >
					<ListGroup variant="flush">
						<ListGroup.Item className="border-0 py-2">
							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Total:</Col>
								<Col xs={6} className="text-end fw-semibold text-success">
									{formatearNumeroConPuntos(totalPrice)}
								</Col>
							</Row>
							<hr className="my-2" />
							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Envío:</Col>
								<Col xs={6} className="text-end fw-semibold ">
									{formatearNumeroConPuntos(delivery.price)}
								</Col>
							</Row>
							<hr className="my-2" />
							<Row className="mb-2">
								<Col xs={8} className="text-secondary">Estado del pago:</Col>
								<Col xs={4} className="text-end fw-semibold">
									Pagado
								</Col>
							</Row>

						</ListGroup.Item>
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export { PaymentInfoOrder };
