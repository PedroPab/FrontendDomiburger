import { Button, Form, Row, Col } from 'react-bootstrap';
import { findClientForPhone } from "../../../Utils/api/findClient";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import './index.css'

const BuscadorCliente = ({
  telefono,
  setTelefono,
  token,
  dataCliente,
  setDataCliente
}) => {

  const buscarCliente = async () => {
    const dataClient = await findClientForPhone(telefono, token);
    if (!dataClient) {
      setDataCliente(null);
    } else {
      setDataCliente(dataClient);
    }
  };

  return (
    <>
      <h3>Buscar Cliente</h3>
      <Form>
        <Form.Group controlId="formTelefono">
          <Row>
            <Form.Label>Teléfono:</Form.Label>
            {/* Alineamos de forma vertical el input y el botón */}
            <Row className="align-items-center">
              <Col>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={telefono}
                  onChange={setTelefono}
                  // Añade aquí las clases de Bootstrap que necesites, por ejemplo:
                  // className="form-control"
                  // inputClass="form-control"
                  // buttonClass="form-control"
                  country="CO"
                  defaultCountry="CO"
                  className="mi-clase-personalizada-phone-input"

                />
              </Col>
              <Col>
                <Button variant="primary" onClick={() => buscarCliente()}>
                  Buscar Cliente
                </Button>
              </Col>
            </Row>
          </Row>
        </Form.Group>
      </Form>
      <hr />
      {
        dataCliente ?
          <div>
            <p>Nombre: {dataCliente?.name}</p>
            <p>Teléfono: {dataCliente?.phone}</p>
            <p>Id cliente: {dataCliente?.id}</p>
            <p>Cantidad de pedidos: {dataCliente?.orders?.length}</p>
          </div>
          :
          <div>
            <p>Cliente no encontrado</p>
          </div>
      }
      <hr />
    </>
  );
};

export default BuscadorCliente;
