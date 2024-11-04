// components/OrderCountIndicator.js
import { useContext } from 'react';
import { MiContexto } from '../../Context/index';
import { BiStar } from 'react-icons/bi'; // Icono de React Icons, puedes cambiarlo a otro si prefieres

const OrderCountIndicator = () => {
  const { items } = useContext(MiContexto);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
      <BiStar size={24} style={{ marginRight: '5px' }} /> {/* Icono de pedidos */}
      <span>{items?.length || 0}</span> {/* Muestra la cantidad de pedidos */}
    </div>
  );
};

export { OrderCountIndicator };
