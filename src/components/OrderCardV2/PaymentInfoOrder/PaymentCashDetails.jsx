// components/PaymentCashDetails.jsx
import { Row, Col } from "react-bootstrap";
import formatearNumeroConPuntos from "../../../Utils/formatearNumeroConPuntos";

const PaymentCashDetails = ({ billAmount, changeAmount }) => {
  return (
    <>
      <hr className="my-2" />
      <Row className="mb-2">
        <Col xs={6} className="text-secondary">Billete entregado:</Col>
        <Col xs={6} className="text-end fw-semibold">
          {formatearNumeroConPuntos(billAmount)}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={6} className="text-secondary">Cambio a devolver:</Col>
        <Col xs={6} className="text-end fw-semibold text-success">
          {formatearNumeroConPuntos(changeAmount)}
        </Col>
      </Row>
    </>
  );
};

export default PaymentCashDetails;
