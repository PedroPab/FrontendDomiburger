// components/PaymentBreakdown.jsx
import { Row, Col } from "react-bootstrap";
import formatearNumeroConPuntos from "../../../Utils/formatearNumeroConPuntos";

const PaymentBreakdown = ({ totalPrice, delivery }) => {
	return (
		<>
			<hr className="my-2" />
			<Row className="mb-2">
				<Col xs={6} className="text-secondary">Envío:</Col>
				<Col xs={6} className="text-end fw-semibold">
					{formatearNumeroConPuntos(delivery.price)}
				</Col>
			</Row>
			<hr className="my-2" />
			<Row className="mb-2">
				<Col xs={6} className="text-secondary">Productos:</Col>
				<Col xs={6} className="text-end fw-semibold">
					{formatearNumeroConPuntos(totalPrice - delivery.price)}
				</Col>
			</Row>
			<hr className="my-2" />
			<Row className="mb-2">
				<Col xs={6} className="text-secondary">Total:</Col>
				<Col xs={6} className="text-end fw-semibold text-success">
					{formatearNumeroConPuntos(totalPrice)}
				</Col>
			</Row>
		</>
	);
};

export default PaymentBreakdown;
