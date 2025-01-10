import { Row, Col, Alert } from 'react-bootstrap';
import CardCreate from '../CardCreate';
import OrderCard from '../OrderCard';

const ListOrders = ({ orders, handleCardClick }) => {
  return (
    <>
      <Row className="g-3 mt-4 mb-4">
        {/* Tarjeta para crear un nuevo focus */}
        <Col xs={12} sm={6} lg={4}>
          <CardCreate
            handleCardClick={handleCardClick}
            messageText='Crear un nuevo pedido' />
        </Col>
        {orders.length === 0 ? (
          <Alert variant="warning" className="mt-4 text-center">
            No hay pedidos para mostrar
          </Alert>
        ) : (
          <>{orders.map((order) => (
            <Col xs={12} sm={6} lg={4} key={order.id}>
              <OrderCard dataPedido={order.data} />
            </Col>
          ))}
          </>
        )}
      </Row>
    </>
  );
};

export default ListOrders;
