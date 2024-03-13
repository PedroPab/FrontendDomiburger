import { Form, ButtonGroup, Button } from 'react-bootstrap';

const InputCantidadNumber = ({ cantidad, setCantidad, textLabel = '', buttonPrimary }) => {
  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) {
      value = 0;
    }
    setCantidad(value);
  };

  const incrementar = () => {
    setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  // Estilos para los botones redondos
  const roundButtonStyle = {
    borderRadius: '50%',
    width: '40px', // Establece un ancho fijo para hacerlos más circulares
    height: '40px', // Establece una altura fija para hacerlos más circulares
    display: 'flex', // Alinea el contenido del botón (icono o texto) en el centro
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 5px', // Añade un pequeño espacio entre los botones
  };

  return (
    <Form.Group controlId="formCantidadReferidos">
      <Form.Label>{textLabel}</Form.Label>
      <div className="d-flex align-items-start justify-content-between">
        <Form.Control
          type="number"
          value={cantidad}
          onChange={handleChange}
          min="0"
          className="me-2"
          style={{ maxWidth: '200px' }} // Puedes ajustar el ancho del input según necesites
        />
        <ButtonGroup >
          <Button variant="outline-secondary" onClick={disminuir} style={roundButtonStyle}>-</Button>
          {/* un espacio vació */}
          <Button variant="outline-secondary" onClick={incrementar} style={roundButtonStyle}>+</Button>

        </ButtonGroup>
        {buttonPrimary}
      </div >

    </Form.Group >
  );
};

export default InputCantidadNumber;
