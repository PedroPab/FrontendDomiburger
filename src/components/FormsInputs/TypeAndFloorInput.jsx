import { Col, Row, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

const TypeAndFloorInput = ({ floor, setFloor, propertyType, setPropertyType }) => {
  // Estado para el select del tipo de inmueble

  // Maneja el cambio del input de piso/apartamento
  const handleChangeFloor = (e) => {
    // Permite letras, espacios y números
    const rta = e.target.value.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\s0-9]/g, '');
    setFloor(rta);
  };

  // Maneja el cambio del select de tipo de inmueble
  const handleTypeChange = (e) => {
    setPropertyType(e.target.value);
  };

  return (
    <Row className="mb-3">
      <Col md={6}>
        {/* Select con opciones de tipos de inmueble */}
        <Form.Group controlId="propertyType" className="">
          <Form.Label>
            Tipo de Ubicación
          </Form.Label>
          <Form.Control as="select" value={propertyType} onChange={handleTypeChange}>
            <option value="">Seleccione un tipo</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="oficina">Oficina</option>
            <option value="otro">Otro</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={6}>

        <Form.Group className="">
          <Form.Label> Piso o Apartamento</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaUser />
            </InputGroup.Text>
            <FormControl
              id='piso'
              type="text"
              placeholder="Ej: 3"
              value={floor}
              onChange={handleChangeFloor}
              autoComplete="true"
            />
          </InputGroup>
        </Form.Group>
      </Col>
      <Form.Text className="text-muted">
        Así entregaremos más rápido tu pedido
      </Form.Text>
    </Row>
  );
};

export { TypeAndFloorInput };
