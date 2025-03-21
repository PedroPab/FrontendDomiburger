import { Col, Row, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaHouseUser } from "react-icons/fa";
import { LOCATIONS } from './../../Utils/const/locations'; // Asegúrate de importar correctamente

const TypeAndFloorInput = ({ floor, setFloor, errors, propertyType, setPropertyType }) => {
  const [errorFloor, errorType] = errors;

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
        <Form.Group controlId="propertyType">
          <Form.Label>Tipo de Ubicación</Form.Label>
          <Form.Control required as="select" value={propertyType} onChange={handleTypeChange}>
            {Object.entries(LOCATIONS).map(([key, value]) => {
              return (
                <option key={key} value={value?.value}>{value.name}</option>
              )
            })}
          </Form.Control>
          {errorType && <Form.Text className="text-danger">{errorType}</Form.Text>}
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group>
          <Form.Label>Piso o Apartamento</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaHouseUser />
            </InputGroup.Text>
            <FormControl
              required
              id="piso"
              type="text"
              placeholder="Ej: piso 2 apto 203"
              value={floor}
              onChange={handleChangeFloor}
              autoComplete="true"
            />
          </InputGroup>
          {errorFloor && <Form.Text className="text-danger">{errorFloor}</Form.Text>}
        </Form.Group>
      </Col>

      <Form.Text className="text-muted">
        Así entregaremos más rápido tu pedido
      </Form.Text>
    </Row>
  );
};

export { TypeAndFloorInput };
