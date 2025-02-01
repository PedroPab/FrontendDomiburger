import { Row, Col, Alert } from 'react-bootstrap';
// import CardCreate from '../CardCreate';
import { ProductCard } from '../ProductCard.jsx';
import CardCreate from '../../CardCreate/index.jsx';

const ListProducts = ({ products, handleCardClick, handleEdit }) => {
  return (
    <>
      <Row className="g-3 mt-4 mb-4">
        {/* Tarjeta para crear un nuevo focus */}
        <Col xs={12} sm={4} lg={3}>
          <CardCreate
            handleCardClick={handleCardClick}
            messageText='Crear un nuevo Producto' />
        </Col>
        {products.length === 0 ? (
          <Alert variant="warning" className="mt-4 text-center">
            No hay pedidos para mostrar
          </Alert>
        ) : (
          <>{products.map((order) => (
            <Col xs={12} sm={4} lg={3} key={order.id}>
              <ProductCard dataPedido={order.data} handleEdit={handleEdit} />
            </Col>
          ))}
          </>
        )}
      </Row>
    </>
  );
};

export default ListProducts;
