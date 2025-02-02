import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MiContexto } from '../../../../../Context';
import { UtilsApi } from '../../../../../Utils/utilsApi';

// eslint-disable-next-line no-unused-vars
const BotonConfirmarPagoPedido = ({ idOrder, handleClose }) => {
  const context = useContext(MiContexto)

  const [confirmar, setConfirmar] = useState(false);

  const handleConfirmar = () => {
    // Lógica para confirmar el pedido

    const token = context.tokenLogin.token

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
