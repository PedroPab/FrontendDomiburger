import { Badge } from 'react-bootstrap';
import './RainbowBadge.css'; // Importamos los estilos

const RainbowBadge = () => {
  // Generar un número aleatorio y verificar si es menor a 1/500
  const isSpecialBadge = Math.random() < 1 / 500;

  // Seleccionar la clase según el resultado
  const badgeClass = isSpecialBadge ? 'rainbow-badge-special' : 'rainbow-badge';

  return (
    <Badge className={`${badgeClass} position-absolute top-0 translate-middle-y rounded-pill px-3 py-1 fs-6 shadow`}>
      {isSpecialBadge ? 'NUEVO!!!' : 'NUEVO'}
    </Badge>
  );
};

export default RainbowBadge;
