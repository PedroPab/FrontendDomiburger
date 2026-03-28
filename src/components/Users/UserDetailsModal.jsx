import { Modal, ListGroup, Badge, Row, Col, Button } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaIdBadge, FaCalendar, FaWhatsapp } from 'react-icons/fa';
import { RoleList } from '../RoleList';

const UserDetailsModal = ({ show, handleClose, user }) => {
  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <FaUser className="me-2" />
          Detalles del Usuario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center mb-3">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="rounded-circle mb-3 shadow"
                style={{ width: 150, height: 150, objectFit: 'cover' }}
              />
            ) : (
              <div
                className="bg-secondary d-flex align-items-center justify-content-center text-white mx-auto mb-3 shadow"
                style={{ width: 150, height: 150, borderRadius: '50%', fontSize: '3rem' }}
              >
                {user.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
            <h4>{user.name || 'Sin nombre'}</h4>
          </Col>

          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <FaIdBadge className="me-2 text-primary" />
                <strong>ID:</strong> <code>{user.id}</code>
              </ListGroup.Item>
              <ListGroup.Item>
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> {user.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <FaPhone className="me-2 text-primary" />
                <strong>Telefono:</strong> {user.phone || 'No registrado'}
                {user.phone && (
                  <a
                    href={`https://wa.me/${user.phone?.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ms-2"
                  >
                    <FaWhatsapp className="text-success" size={20} />
                  </a>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <FaCalendar className="me-2 text-primary" />
                <strong>Fecha de registro:</strong> {formatDate(user.createdAt)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Roles:</strong>
                <div className="mt-2">
                  <RoleList roles={user.roles} />
                </div>
              </ListGroup.Item>
              {user.assignedKitchens && user.assignedKitchens.length > 0 && (
                <ListGroup.Item>
                  <strong>Cocinas asignadas:</strong>
                  <div className="mt-2">
                    {user.assignedKitchens.map(k => (
                      <Badge key={k} bg="info" className="me-1">{k}</Badge>
                    ))}
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { UserDetailsModal };
