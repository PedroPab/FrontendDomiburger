import { Col } from 'react-bootstrap';

const EstadoPago = ({ pagado }) => {
  return (
    <Col>
      {pagado ? (
        <p className="text-success">El pedido ha sido pagado ✅</p>
      ) : (
        <p className="text-danger">El pedido aún no ha sido pagado ❌</p>
      )}
    </Col>
  );
};

export { EstadoPago };
