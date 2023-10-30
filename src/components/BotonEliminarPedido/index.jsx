import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const BotonEliminarPedido = ({ data }) => {
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
        <Button variant='warning' onClick={() => setConfirmar(true)}>Eliminar Pedido</Button>
      )}
    </div>
  );
};

export default BotonEliminarPedido;
