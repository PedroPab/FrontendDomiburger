import { Card, ListGroup } from 'react-bootstrap';
import { FaPhone, FaMapMarkedAlt, FaRegCalendarAlt, FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';

const ClienteCard = ({ cliente }) => {
  const formatDate = (seconds) => {
    let date = new Date(seconds * 1000);
    return `${date.toLocaleDateString("es-ES")} ${date.toLocaleTimeString("es-ES")}`;
  };

  return (
    <Card className="mb-3 shadow-lg">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">{cliente.name}</h4>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <FaPhone className="text-secondary me-2" />
          Teléfono: {cliente.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <FaMapMarkedAlt className="text-success me-2" />
          Dirección: {cliente.address.address_complete}
        </ListGroup.Item>
        <ListGroup.Item>
          Coordenadas: Lat {cliente.address.coordinates.lat}, Lng {cliente.address.coordinates.lng}
        </ListGroup.Item>
        <ListGroup.Item>
          Dirección Verificada:
          {cliente.address.verified ?
            <FaRegCheckCircle className="text-success ms-2" /> :
            <FaRegTimesCircle className="text-danger ms-2" />
          }
        </ListGroup.Item>
        <ListGroup.Item>
          <FaRegCalendarAlt className="text-info me-2" />
          Fecha de Creación: {formatDate(cliente.dateCreate._seconds)}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ClienteCard;
