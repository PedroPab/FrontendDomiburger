// components/OrderCountIndicator.js
import { useContext } from 'react';
import { MiContexto } from '../../Context/index';
import { AiFillStar } from 'react-icons/ai'; // Icono de estrella con relleno

const OrderCountIndicator = () => {
  const { items } = useContext(MiContexto);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
      <AiFillStar size={24} color="#ffc107" style={{ marginRight: '5px' }} /> {/* Icono de pedidos con color amarillo Bootstrap */}
      <span>{items?.length || 0}</span> {/* Muestra la cantidad de pedidos */}
    </div>
  );
};

export { OrderCountIndicator };
