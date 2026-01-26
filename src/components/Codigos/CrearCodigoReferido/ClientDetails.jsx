import { Accordion, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaClipboardList, FaIdBadge, FaStar, FaStarHalfAlt, FaRegStar, FaUser, FaWhatsapp, FaRobot, FaNotesMedical } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ClientDetails = ({ cliente }) => {
  // Desestructurar los datos del cliente
  const { name, phone, id, orders, clientNote } = cliente || {};

  // Si no hay datos del cliente, no se muestra nada
  if (!cliente) return null;

  // Calificación del cliente random del 1 al 5
  const rating = parseInt(Math.random() * 5) + 1;


  // Función para renderizar las estrellas
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning me-1" />);
      } else if (i - rating < 1 && i > rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning me-1" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning me-1" />);
      }
    }
    return stars;
  };

  return (
    <Accordion defaultActiveKey="0" className="mt-4 mb-4">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Detalles del Cliente</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            {name && (
              <ListGroupItem>
                <FaUser className="me-2" />
                <strong>Nombre:</strong> {name}
              </ListGroupItem>
            )}
            {/* note */}
            {clientNote && (
              <ListGroupItem>
                <FaNotesMedical className="me-2" />
                <strong>Nota:</strong> {clientNote}
              </ListGroupItem>
            )}
            {/* calificación */}
            {rating !== undefined && (
              <ListGroupItem className="d-flex align-items-center">
                <FaStar className="me-2" />
                <strong className="me-2">Calificación:</strong>
                <span>{renderStars(rating)}</span>
              </ListGroupItem>
            )}
            {/* enlace para whatsapp */}
            {phone && (
              <ListGroupItem>
                <FaRobot className="me-2" /> {/* Ícono de bot */}
                <strong>Whatsapp:</strong>
                <a href={`https://wa.me/${phone}`} target="_blank" className="ms-2" rel="noreferrer">
                  {phone}
                  <FaWhatsapp className="ms-2" /> {/* Ícono de WhatsApp */}

                </a>
              </ListGroupItem>
            )}

            {id && (
              <ListGroupItem>
                <FaIdBadge className="me-2" />
                <strong>ID Cliente:</strong> {id}
              </ListGroupItem>
            )}
            {orders && (
              <ListGroupItem>
                <FaClipboardList className="me-2" />
                <strong>Pedidos:</strong>
                <Badge bg="info" className="ms-2">{orders.length}</Badge> {/* Mostrar la cantidad de pedidos */}
              </ListGroupItem>
            )}
            {/* Botón para ver más datos del cliente en otra pestaña */}
            {id && (
              <ListGroupItem>
                <Link target="_blank" to={`/clientes/${id}`} className="btn btn-primary w-100">
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
