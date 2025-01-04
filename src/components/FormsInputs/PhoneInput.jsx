import { Form, Row, Col } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const PhoneInputComponent = ({
  telefono,
  setTelefono,
}) => {

  return (
    <>
      <Form.Group controlId="formTelefono">
        <Form.Label>Teléfono</Form.Label>
        <Row className="align-items-center mb-3">
          <Col xs={12} md={8} className="mb-2 mb-md-0">
            <PhoneInput
              placeholder="Ingresa el número de teléfono"
              value={telefono}
              onChange={setTelefono}
              country="CO"
              defaultCountry="CO"
              inputComponent={Form.Control}
            />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default PhoneInputComponent;