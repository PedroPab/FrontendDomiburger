import { Row, Col, Alert } from 'react-bootstrap';
import ClientCard from '../ClientCard/ClientCard';
import CardCreate from '../../common/CardCreate';

const ClientList = ({ clients, handleCardCreateClientClick }) => {
  return (
    <>
      <Row className="g-3 mt-4 mb-4">
        {/* Tarjeta para crear un nuevo focus */}
        <Col xs={12} sm={6} lg={4}>
          <CardCreate handleCardClick={handleCardCreateClientClick} messageText='Crear un nuevo cliente' />
        </Col>
        {clients.length === 0 ? (
          <Alert variant="warning" className="mt-4 text-center">
            No hay clientes disponibles.
          </Alert>
        ) : (
          <>{clients.map((client) => (
            <Col xs={12} sm={6} lg={4} key={client.id}>
              <ClientCard client={client} />
            </Col>
          ))}
          </>
        )}
      </Row>
    </>
  );
};

export default ClientList;
