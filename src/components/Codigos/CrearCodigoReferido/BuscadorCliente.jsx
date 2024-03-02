import { Button, Form, Row, Col } from 'react-bootstrap';
import { findClientForPhone } from "../../../Utils/api/findClient";

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
            <Col>
              <Form.Label>Teléfono:</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="tel"
                    value={telefono}
                    onChange={(e) => {
                      let telefono = e.target.value;
                      // Formateamos el número para que no tenga espacios ni caracteres especiales, solo se permite números y el signo +
                      telefono = telefono.replace(/[^+0-9]/g, '');
                      setTelefono(telefono);
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="primary" onClick={() => buscarCliente()}>
                    Buscar Cliente
                  </Button>
                </Col>
              </Row>
            </Col>
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
