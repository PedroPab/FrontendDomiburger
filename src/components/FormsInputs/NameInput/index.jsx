import { Form } from 'react-bootstrap';

const NameInput = ({ name, setName }) => {
  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setName(rta);
  };

  return (
    <Form.Group controlId="formCodigo">
      <Form.Label>Nombre:</Form.Label>
      <Form.Control
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Nombre Completo"
        aria-describedby="codigoHelpBlock"
      />
      <Form.Text id="codigoHelpBlock" muted>
        Que bonito nombre.
      </Form.Text>
    </Form.Group>
  );
};

export default NameInput;
