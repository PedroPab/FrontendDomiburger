import { Col } from 'react-bootstrap';

const MetodoDePago = ({ metodo }) => {
  return (
    <Col>
      <span className="font-weight-bold">Método de Pago:</span> {metodo}
    </Col>
  );
};

export default MetodoDePago;
