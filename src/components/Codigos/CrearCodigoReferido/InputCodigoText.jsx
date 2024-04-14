import { Form } from 'react-bootstrap';

const InputCodigoText = ({ codigo, setCodigo, ButtonComponent }) => {
  const handleChange = (e) => {
    // Quitamos los espacios con expresiones regulares y todo lo que no sea alfanumérico
    const rta = e.target.value.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
    setCodigo(rta);
  };

  return (
    <div className='m-3'>
      <Form.Group controlId="formCodigo">
        <Form.Label>Código:</Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            value={codigo}
            onChange={handleChange}
            placeholder="Introduce el código"
            aria-describedby="codigoHelpBlock"
            className="me-2" // Agrega un margen a la derecha
          />
          {ButtonComponent}
        </div>
        <Form.Text id="codigoHelpBlock" muted>
          Introduce el código sin espacios.
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default InputCodigoText;
