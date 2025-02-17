import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { FaMapMarkerAlt, FaEdit, FaEye, FaBox } from "react-icons/fa";

const KitchenCard = ({ kitchen }) => {
  return (
    <Card className="shadow-sm border-0 rounded-3 p-3">
      {/* Encabezado con Nombre e ID */}
      <Row className="mb-2">
        <Col>
          <h5 className="fw-bold text-primary">{kitchen.name}</h5>
        </Col>
        <Col xs="auto">
          <Badge bg="secondary" className="text-wrap">{kitchen.id}</Badge>
        </Col>
      </Row>

      {/* Dirección */}
      <p className="text-muted mb-2">
        <FaMapMarkerAlt className="me-2 text-danger" />
        {kitchen.address}
      </p>

      {/* Daily Orders con icono */}
      <div className="d-flex align-items-center mb-3">
        <FaBox className="text-warning me-2" size={20} />
        <span className="fw-bold">{kitchen.dailyOrders}</span>
      </div>

      {/* Botones */}
      <Row className="mt-3">
        <Col>
          <Button variant="outline-primary" className="w-100">
            <FaEye className="me-2" /> Ver Más
          </Button>
        </Col>
        <Col>
          <Button variant="primary" className="w-100">
            <FaEdit className="me-2" /> Editar
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export { KitchenCard }