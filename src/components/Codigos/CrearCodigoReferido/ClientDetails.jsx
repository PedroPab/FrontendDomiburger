import { Accordion, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaClipboardList, FaEnvelope, FaIdBadge, FaPhone, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ClientDetails = ({ cliente }) => {
  // Desestructurar los datos del cliente
  const { name, phone, id, email, orders } = cliente || {};

  // Si no hay datos del cliente, no se muestra nada
  if (!cliente) return null;

  return (
    <Accordion defaultActiveKey="0" className="mt-3">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Detalles del Cliente</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            {name && (
              <ListGroupItem>
                <FaUser className="me-2" />
                <strong>Nombre:</strong>
              </ListGroupItem>
            )}
            {phone && (
              <ListGroupItem>
                <FaPhone className="me-2" />
                <strong>Teléfono:</strong> {phone}
              </ListGroupItem>
            )}
            {id && (
              <ListGroupItem>
                <FaIdBadge className="me-2" />
                <strong>ID Cliente:</strong> {id}
              </ListGroupItem>
            )}
            {email && (
              <ListGroupItem>
                <FaEnvelope className="me-2" />
                <strong>Email:</strong> {email}
              </ListGroupItem>
            )}
            {orders && (
              <ListGroupItem>
                <FaClipboardList className="me-2" />
                <strong>Pedidos:</strong>
                <Badge bg="info" className="ms-2">{orders.length}</Badge> {/* Mostrar la cantidad de pedidos */}
              </ListGroupItem>
            )}
            {/* Boton para ir al ver mas datos del cliente en otra pestaña */}
            {id && (
              <ListGroupItem>
                <Link to={`/clientes/${id}`} className="btn btn-primary w-100">
                  Ver más detalles
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ClientDetails;
