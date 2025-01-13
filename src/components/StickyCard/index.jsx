import { useContext } from "react";
import OrderCard from "../OrderCard";
import { MiContexto } from "../../Context";

const StickyCard = ({ show, children, pedidos }) => {

  const context = useContext(MiContexto);

  const cardStyle = {
    position: 'fixed', // Posición fija en la pantalla
    bottom: '20px',   // Colocada en la parte inferior
    right: '20px',    // Colocada a la derecha
    zIndex: 1000,     // Asegura que esté sobre otros elementos
    display: show ? 'block' : 'none', // Se muestra solo si 'show' es true
  };

  return (
    <div style={cardStyle}>
      {children}
      <OrderCard
        dataPedido={pedidos.find(item => item.id === context.idItemSelect)}
      />
    </div>
  );
};

export default StickyCard;
