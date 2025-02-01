import { Badge } from 'react-bootstrap';
import './RainbowBadge.css'; // Importamos los estilos

const RainbowBadge = () => {
  return (
    <Badge className="rainbow-badge position-absolute top-0 start-0 m-3 rounded-pill px-3 py-1 fs-6 shadow">
      NUEVO
    </Badge>
  );
};

export default RainbowBadge;
