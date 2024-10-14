import { useState } from 'react';
import { Card, Button, ListGroup, Row, Col, Badge, Tooltip, OverlayTrigger, Collapse } from 'react-bootstrap';
import { FaCheck, FaUsers, FaAward, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import InfoIcon from '../../InfoIcon';

const CodeCard = ({ code, addProducts, deleteProducts, client }) => {
  const [open, setOpen] = useState(false); // Estado para el acordeón

  const handleToggleAdd = () => addProducts(code);
  const handleToggleDelete = () => deleteProducts(code);
  const handleToggleDetails = () => setOpen(!open); // Toggle para acordeón

  const isClaimConditionValid = () => {
    const referidos = code?.used?.length || 0;
    const premios = code?.reward?.length || 0;
    return parseInt(referidos / 3) > premios;
  };

  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  return (
    <Card className="shadow-lg mb-4 border-0" style={{ borderRadius: '15px', padding: '20px' }}>
      <Card.Body>
        {/* Título y tipo del código, hace toggle del acordeón al hacer click */}
        <Card.Title
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={handleToggleDetails} // Acción para mostrar/ocultar detalles
          style={{ cursor: 'pointer' }}
        >
          <div className="fw-bold fs-4">
            {code.id}
            <OverlayTrigger
              placement="top"
              overlay={renderTooltip('Código único para rastrear productos y recompensas')}
            >
              <FaInfoCircle className="ms-2 text-muted" />
            </OverlayTrigger>
          </div>
          <div className="text-muted fs-6">({code.type})</div>
        </Card.Title>

        {/* Mejora en la visualización de referidos y premios */}
        <Row className="text-center mb-4">
          <Col className="d-flex flex-column align-items-center">
            <FaUsers className="mb-1" size={24} />
            <span className="text-muted">Referidos</span>
            <span className="fw-bold">{code?.used?.length}</span>
          </Col>
          <Col className="d-flex flex-column align-items-center">
            <FaAward className="mb-1" size={24} />
            <span className="text-muted">Premios</span>
            <span className="fw-bold">{code?.reward?.length}</span>
          </Col>
          {code.isAdded && (
            <Col className="d-flex flex-column align-items-center">
              <FaCheck style={{ color: 'green', fontSize: '24px' }} />
              <span className="text-success fw-bold">Añadido</span>
            </Col>
          )}
        </Row>

        {/* Acordeón que se abre/cierra */}
        <Collapse in={open}>
          <div>
            <h6 className="mt-3 text-primary">Resumen de las adiciones de referidos:</h6>
            <ListGroup horizontal className="mb-3">
              {code.products.map((product) => (
                <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                  {product.name}
                  <Badge bg="success">{product.type}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <h6 className="text-primary">Resumen de recompensas:</h6>
            <ListGroup horizontal className="mb-3">
              {code.productsReward.length ? (
                code.productsReward.map((reward) => (
                  <ListGroup.Item key={reward.id} className="d-flex justify-content-between align-items-center">
                    {reward.name}
                    <Badge bg="success">{reward.type}</Badge>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item className="text-muted">Sin recompensas</ListGroup.Item>
              )}
            </ListGroup>

            {/* Botones para ver detalles */}
            <div className="d-flex justify-content-between mt-4">
              <Link target="_blank" to={`/codigos/buscar/?id=${code.id}`} className="btn btn-outline-primary w-50 me-2">
                Ver detalles del código
              </Link>
              <Link target="_blank" to={`/clientes/${code.clientId}`} className="btn btn-outline-secondary w-50">
                Ver cliente
              </Link>
            </div>
          </div>
        </Collapse>

        {/* Botones de acción con animación hover */}
        <div className="d-flex justify-content-end mt-3">
          {client?.id === code.clientId ? (
            <Button
              variant="info"
              onClick={handleToggleAdd}
              className="me-2"
              disabled={!isClaimConditionValid()}
              style={{ transition: 'background-color 0.3s ease' }}
            >
              Agregar premio
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleToggleAdd}
              className="btn"
              style={{ transition: 'background-color 0.3s ease' }}
            >
              Agregar adición
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CodeCard;
