import { Form } from 'react-bootstrap';

const PaymentMethodInput = ({ paymentMethod, setPaymentMethod }) => {
  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setPaymentMethod(rta);
  };

  return (
    <div className='m-3'>
      <Form.Group controlId="formCodigo">
        <Form.Label>Metodo de pago:</Form.Label>
        <Form.Control
          as="select"
          value={paymentMethod}
          onChange={handleChange}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
        </Form.Control>
        <Form.Text id="codigoHelpBlock" muted>
          Si es transfrencia, la cuenta te llegara por un mensaje.
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default PaymentMethodInput;
