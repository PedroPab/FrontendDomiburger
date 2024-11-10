import { Row, InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs'; // Para el ícono de la X, usando react-icons

const Buscador = ({ setBusqueda, busqueda, textPlaceholder = '', buscarCodigo }) => {

  const limpiarBusqueda = () => setBusqueda('');

  return (
    <Row className="justify-content-center mb-4 mt-4">
      <Col xs={12} md={8} lg={6}>
        <InputGroup >
          <FormControl
            placeholder={`${textPlaceholder}...`}
            aria-label={`${textPlaceholder}`}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button onClick={buscarCodigo} className="mx-1 buscar-btn">Buscar</Button>
          <Button variant="outline-danger" onClick={limpiarBusqueda} title="Limpiar búsqueda">
            <BsXCircle />
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default Buscador;
