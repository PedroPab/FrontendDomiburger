// components/ReconnectButton.js
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { MiContexto } from '../../Context/index';
import { BiRecycle } from 'react-icons/bi';

const ReconnectButton = () => {
  const { isConnected, reconnectSocket } = useContext(MiContexto);

  if (isConnected) return null; // Si está conectado, no mostramos el botón

  return (
    <Button
      variant="warning"
      onClick={reconnectSocket}
      className="ms-2"
    >
      {/* icono de reconectar */}
      <BiRecycle />
    </Button>
  );
};

export { ReconnectButton };
