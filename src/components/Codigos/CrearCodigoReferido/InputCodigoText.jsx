import { Form } from 'react-bootstrap';

const InputCodigoText = ({ codigo, setCodigo }) => {
  const handleChange = (e) => {
    // Quitamos los espacios con expresiones regulares
    const rta = e.target.value.replace(/\s/g, "");
    setCodigo(rta);
  };

  return (
    <Form.Group controlId="formCodigo">
      <Form.Label>Código:</Form.Label>
      <Form.Control
        type="text"
        value={codigo}
        onChange={handleChange}
        placeholder="Introduce el código"
        aria-describedby="codigoHelpBlock"
      />
      <Form.Text id="codigoHelpBlock" muted>
        Introduce el código sin espacios.
      </Form.Text>
    </Form.Group>
  );
};

export default InputCodigoText;
