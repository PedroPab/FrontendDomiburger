import { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UtilsApi } from '../../../../../Utils/utilsApi';
import { useAuth } from '../../../../../Context/AuthContext';

const CambiarMetodoPago = ({ idOrder, handleClose }) => {
  const selectMetodoDePago = useRef();
  const [showButtons, setShowButtons] = useState(true);

  const handleEnviar = () => {
    setShowButtons(false);
  };
  const { token } = useAuth()

  const handleConfirmar = () => {
    // Lógica para confirmar el cambio de método de pago
    //cambiamos el metodo de pago

    const url = `pedidos/cambiarFee?id=${idOrder}&fee=${selectMetodoDePago.current.value}`
    UtilsApi({ peticion: url, token, vervo: 'PATCH' })
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
