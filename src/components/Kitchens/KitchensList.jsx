import { Row, Col, Alert } from 'react-bootstrap';
// import CardCreate from '../CardCreate';
import { KitchenCard } from './KitchenCard.jsx';
import CardCreate from '../CardCreate/index.jsx';

const KitchensList = ({ kitchens, handleCardClick, handleEdit }) => {
  return (
    <>
      <Row className="g-3 mt-4 mb-4">
        {/* Tarjeta para crear un nuevo focus */}
        <Col xs={12} sm={4} lg={3}>
          <CardCreate
            handleCardClick={handleCardClick}
            messageText='Crear una nueva cocina' />
        </Col>
        {kitchens.length === 0 ? (
          <Alert variant="warning" className="mt-4 text-center">
            No hay pedidos para mostrar
          </Alert>
        ) : (
          <>{kitchens.map((kitchen, index) => (
            <Col xs={12} sm={4} lg={3} key={index}>
              <KitchenCard kitchen={kitchen} handleEdit={handleEdit} />
            </Col>
          ))}
          </>
        )}
      </Row>
    </>
  );
};

export { KitchensList };
