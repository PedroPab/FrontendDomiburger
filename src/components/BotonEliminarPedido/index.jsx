import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UtilsApi } from '../../Utils/utilsApi';
import { MiContexto } from '../../Context';

const BotonEliminarPedido = ({ data, handleClose }) => {
  const [confirmar, setConfirmar] = useState(false);
  const context = useContext(MiContexto)

  const handleConfirmar = () => {
    // Lógica para confirmar el pedido
    const token = context.tokenLogin.token

    const url = `estados/eliminados?idPedido=${data.id}`
    UtilsApi({ peticion: url, token, vervo: 'DELETE' })
      .then(() => handleClose())
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
