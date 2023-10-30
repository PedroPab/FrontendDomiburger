import { useState } from 'react';
import { Button } from 'react-bootstrap';

// eslint-disable-next-line no-unused-vars
const BotonConfirmarPagoPedido = ({ data }) => {
  const [confirmar, setConfirmar] = useState(false);

  const handleConfirmar = () => {
    // Lógica para confirmar el pedido
    setConfirmar(false);
  };

  const handleCancelar = () => {
    // Lógica para cancelar el pedido
    setConfirmar(false);
  };

  return (
    <div>
      {confirmar ? (
        <div>
          <Button variant="outline-success" onClick={handleConfirmar}>Confirmar</Button>
          <Button variant="outline-danger" onClick={handleCancelar}>Cancelar</Button>
        </div>
      ) : (
        <Button variant='warning' onClick={() => setConfirmar(true)}>Confirmar Pago</Button>
      )}
    </div>
  );
};

export default BotonConfirmarPagoPedido;
