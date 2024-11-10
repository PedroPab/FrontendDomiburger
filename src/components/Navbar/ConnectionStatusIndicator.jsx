// components/ConnectionStatusIndicator.js
import { useContext } from 'react';
import { MiContexto } from '../../Context/index';
import { FaWifi } from 'react-icons/fa';
import { BiWifiOff } from 'react-icons/bi';
import { Button } from 'react-bootstrap';

const ConnectionStatusIndicator = () => {
  const { isConnected, reconnectSocket } = useContext(MiContexto);

  return (
    <>
      {isConnected ? (
        // Icono verde cuando está conectado
        <FaWifi
          size={20}
          className="text-success" // Uso de clase Bootstrap para que cambie según el tema
          title="Conectado"
          style={{ marginLeft: '10px' }}
        />
      ) : (
        // Icono de desconexión que es un botón
        <Button
          onClick={reconnectSocket}
          variant="outline-danger"
          className="d-flex align-items-center"
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            borderRadius: '20px',
            transition: 'transform 0.2s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          title="Desconectado. Haz clic para reconectar"
        >
          <BiWifiOff size={20} className="me-2" /> {/* Bootstrap clase "me-2" para margen */}
          Reconectar
        </Button>
      )}
    </>
  );
};

export { ConnectionStatusIndicator };
