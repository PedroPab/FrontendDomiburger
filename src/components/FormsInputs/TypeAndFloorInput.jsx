import { Col, Row, Form } from 'react-bootstrap';
import FormField from '../FormField';
import { FaTable, FaUser } from 'react-icons/fa';

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
    <Row className="m-3">
      <Col md={6}>
        {/* Select con opciones de tipos de inmueble */}
        <Form.Group controlId="propertyType" className="mb-3">
          <Form.Label>
            Tipo de Inmueble <FaTable />
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
        <FormField
          id="piso"
          label="Piso o Apartamento"
          type="text"
          icon={<FaUser />}
          placeholder="Ej: 3"
          value={floor}
          onChange={handleChangeFloor}
          required
          helptext="Así entregaremos más rápido tu pedido"
        />
      </Col>
    </Row>
  );
};

export { TypeAndFloorInput };
