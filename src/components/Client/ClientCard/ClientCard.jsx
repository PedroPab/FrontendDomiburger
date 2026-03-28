import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { RECEPCION_ROUTES } from '../../../Utils/const/namesRutes';

const ClientCard = ({ client }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`${RECEPCION_ROUTES.routes.CLIENTES}/${client.id}`);
  };

  return (
    <Card
      className="h-100 shadow-sm border-10"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fs-5 text-truncate">{client.name}</Card.Title>
          <Card.Text>
            <strong>ID:</strong> {client.id}
          </Card.Text>
          <Card.Text>
            <strong>Telefono:</strong> {client.phone}
          </Card.Text>
          {client.address && (
            <Card.Text>
              <strong>Direccion:</strong> {client.address.address_complete || 'No disponible'}
            </Card.Text>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

ClientCard.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.shape({
      address_complete: PropTypes.string,
    }),
  }).isRequired,
};

export default ClientCard;
