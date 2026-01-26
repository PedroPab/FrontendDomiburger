// src/components/EstadisticaCard.jsx
import { Card } from 'react-bootstrap';

const EstadisticaCard = ({ title, value, icon: Icon }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body className="d-flex align-items-center">
      {Icon && <Icon size={32} className="me-3 text-primary" />}
      <div>
        <Card.Title className="mb-0">{title}</Card.Title>
        <Card.Text className="h4 mb-0">{value}</Card.Text>
      </div>
    </Card.Body>
  </Card>
);

export default EstadisticaCard;
