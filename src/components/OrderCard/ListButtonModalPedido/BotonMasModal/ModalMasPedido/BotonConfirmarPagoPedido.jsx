import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { UtilsApi } from '../../../../../Utils/utilsApi';
import { useAuth } from '../../../../../Context/AuthContext';

 
const BotonConfirmarPagoPedido = ({ idOrder, handleClose }) => {

  const [confirmar, setConfirmar] = useState(false);
  const { token } = useAuth()

  const handleConfirmar = () => {
    // Lógica para confirmar el pedido
    const url = `pedidos/confirmarPago/?id=${idOrder}`
    UtilsApi({ peticion: url, token, vervo: 'POST' })
      .then(() => handleClose())

    setConfirmar(false);
  };

  const handleCancelar = () => {
    // Lógica para cancelar el pedido
    setConfirmar(false);
  };

  return (
    <div className="boton-confirmar-pago-pedido">
      {confirmar ? (
        <div className="confirmar-cancelar-buttons">
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
