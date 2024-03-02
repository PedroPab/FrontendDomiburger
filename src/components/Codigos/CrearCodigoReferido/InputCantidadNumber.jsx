import { Form } from 'react-bootstrap';

const InputCantidadNumber = ({ cantidad, setCantidad }) => {
  const handleChange = (e) => {
    // Solo se pueden ingresar números positivos
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setCantidad(value);
  };

  return (
    <Form.Group controlId="formCantidadReferidos">
      <Form.Label>Cantidad de referidos:</Form.Label>
      <Form.Control
        type="number"
        value={cantidad}
        onChange={handleChange}
        min="0" // Asegura que solo se puedan ingresar números positivos directamente desde el input
      />
    </Form.Group>
  );
};

export default InputCantidadNumber;
