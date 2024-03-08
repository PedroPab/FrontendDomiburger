import { Col, Button } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs'; // Asegúrate de tener react-icons instalado

const MensajeSinCodigos = ({ filtros, limpiarFiltros }) => {
  return (
    <Col className="text-center my-4">
      <p className="mb-3" style={{ fontSize: '1.2rem' }}>No se encontraron códigos.</p>
      {filtros && (
        <Button variant="outline-danger" onClick={limpiarFiltros}>
          <BsXCircle className="me-2" />Limpiar filtro
        </Button>
      )}
    </Col>
  );
};

export default MensajeSinCodigos;
