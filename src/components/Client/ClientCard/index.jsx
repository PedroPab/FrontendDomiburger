import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaMapMarkedAlt, FaRegCalendarAlt, FaRegCheckCircle, FaRegTimesCircle, FaEye } from 'react-icons/fa';
import { RECEPCION_ROUTES } from '../../../Utils/const/namesRutes';

const ClienteCard = ({ cliente }) => {
  const navigate = useNavigate();

  const formatDate = (seconds) => {
    if (!seconds) return 'No disponible';
    let date = new Date(seconds * 1000);
    return `${date.toLocaleDateString("es-ES")} ${date.toLocaleTimeString("es-ES")}`;
  };

  const handleViewDetails = () => {
    navigate(`${RECEPCION_ROUTES.routes.CLIENTES}/${cliente.id}`);
  };

  return (
    <Card className="mb-3 shadow-lg">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{cliente.name}</h4>
        <Button variant="light" size="sm" onClick={handleViewDetails} title="Ver detalles">
          <FaEye className="me-1" /> Ver
        </Button>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FaPhone className="text-secondary me-2" />
          Telefono: {cliente.phone}
        </ListGroup.Item>
        {cliente.address && (
          <>
            <ListGroup.Item>
              <FaMapMarkedAlt className="text-success me-2" />
              Direccion: {cliente.address.address_complete || 'No disponible'}
            </ListGroup.Item>
            {cliente.address.coordinates && (
              <ListGroup.Item>
                Coordenadas: Lat {cliente.address.coordinates.lat}, Lng {cliente.address.coordinates.lng}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              Direccion Verificada:
              {cliente.address.verified ?
                <FaRegCheckCircle className="text-success ms-2" /> :
                <FaRegTimesCircle className="text-danger ms-2" />
              }
            </ListGroup.Item>
          </>
        )}
        <ListGroup.Item>
          <FaRegCalendarAlt className="text-info me-2" />
          Fecha de Creacion: {formatDate(cliente.dateCreate?._seconds)}
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-center">
        <Button variant="primary" size="sm" onClick={handleViewDetails}>
          <FaEye className="me-1" /> Ver Detalles Completos
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ClienteCard;
