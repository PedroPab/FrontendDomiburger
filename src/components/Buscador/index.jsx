import { Row, InputGroup, FormControl, Button } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs'; // Para el ícono de la X, usando react-icons

const Buscador = ({ setBusqueda, busqueda, textPlaceholder = '' }) => {

  const limpiarBusqueda = () => setBusqueda('');

  return (
    <Row className="justify-content-center mb-4 mt-4">
      <InputGroup className="w-50">
        <FormControl
          placeholder={`${textPlaceholder}...`}
          aria-label={`${textPlaceholder}`}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Button variant="outline-danger" onClick={limpiarBusqueda} title="Limpiar búsqueda">
          <BsXCircle />
        </Button>
      </InputGroup>
    </Row>
  );
};

export default Buscador;
