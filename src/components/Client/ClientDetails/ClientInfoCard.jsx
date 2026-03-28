import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaUser, FaPhone, FaCalendar, FaWhatsapp, FaEdit, FaStickyNote } from 'react-icons/fa';

const ClientInfoCard = ({ client, onEdit }) => {
  if (!client) return null;

  const formatDate = (dateObj) => {
    if (!dateObj) return 'No disponible';
    let date;
    if (dateObj._seconds) {
      date = new Date(dateObj._seconds * 1000);
    } else if (typeof dateObj === 'string') {
      date = new Date(dateObj);
    } else {
      return 'No disponible';
    }
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWhatsAppLink = (phone) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <span>
          <FaUser className="me-2" />
          Informacion del Cliente
        </span>
        {onEdit && (
          <Button variant="light" size="sm" onClick={onEdit}>
            <FaEdit className="me-1" /> Editar
          </Button>
        )}
      </Card.Header>
      <Card.Body className="text-center py-4">
        <div
          className="bg-primary d-flex align-items-center justify-content-center text-white mx-auto mb-3 shadow"
          style={{ width: 100, height: 100, borderRadius: '50%', fontSize: '2.5rem' }}
        >
          {client.name?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <h4 className="mb-1">{client.name || 'Sin nombre'}</h4>
        <Badge bg="secondary" className="mb-3">ID: {client.id}</Badge>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <span>
            <FaPhone className="text-primary me-2" />
            <strong>Telefono:</strong>
          </span>
          <span>
            {client.phone || 'No registrado'}
            {client.phone && (
              <a
                href={getWhatsAppLink(client.phone)}
                target="_blank"
                rel="noreferrer"
                className="ms-2"
                title="Enviar WhatsApp"
              >
                <FaWhatsapp className="text-success" size={20} />
              </a>
            )}
          </span>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <span>
            <FaCalendar className="text-primary me-2" />
            <strong>Cliente desde:</strong>
          </span>
          <span>{formatDate(client.dateCreate || client.createdAt)}</span>
        </ListGroup.Item>
        {client.clientNote && (
          <ListGroup.Item>
            <FaStickyNote className="text-warning me-2" />
            <strong>Nota:</strong>
            <p className="mb-0 mt-1 text-muted">{client.clientNote}</p>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export { ClientInfoCard };
