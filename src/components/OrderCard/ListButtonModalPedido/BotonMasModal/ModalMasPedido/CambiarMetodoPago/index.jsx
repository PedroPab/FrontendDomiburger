import { useContext, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UtilsApi } from '../../../../../../Utils/utilsApi';
import { MiContexto } from '../../../../../../Context';

const CambiarMetodoPago = ({ data, handleClose }) => {
  const context = useContext(MiContexto)
  const selectMetodoDePago = useRef();
  const [showButtons, setShowButtons] = useState(true);

  const handleEnviar = () => {
    setShowButtons(false);
  };

  const handleConfirmar = () => {
    // Lógica para confirmar el cambio de método de pago
    //cambiamos el metodo de pago
    const token = context.tokenLogin.token

    const url = `pedidos/cambiarFee?id=${data.id}&fee=${selectMetodoDePago.current.value}`
    UtilsApi({ url: url, token, method: 'PATCH' })
      .then(() => handleClose())

    setShowButtons(true);

  };

  const handleCancelar = () => {
    // Lógica para cancelar el cambio de método de pago
    setShowButtons(true);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="metodoDePagoSelect" >
          <Form.Label>Cambiar Método de Pago</Form.Label>
          <div className='d-flex'>
            <Form.Control as="select" ref={selectMetodoDePago}>
              <option>Transferencia</option>
              <option>Efectivo</option>

            </Form.Control>
            {showButtons ? (
              <Button variant="primary" onClick={handleEnviar}>
                Enviar
              </Button>
            ) : (
              <div>
                <Button variant="success" onClick={handleConfirmar}>
                  Confirmar
                </Button>
                <Button variant="danger" onClick={handleCancelar}>
                  Cancelar
                </Button>
              </div>
            )}
          </div>

        </Form.Group>

      </Form>
    </div>
  );
};

export default CambiarMetodoPago;
