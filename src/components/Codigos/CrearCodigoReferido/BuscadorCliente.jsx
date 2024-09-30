import { Button, Form, Row, Col } from 'react-bootstrap';
import { findClientForPhone } from "../../../Utils/api/findClientPhone";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { toast } from 'react-toastify';

const BuscadorCliente = ({
  telefono,
  setTelefono,
  token,
  dataCliente,
  setDataCliente,
  visibleDataClient = true
}) => {

  const buscarCliente = async () => {
    const dataClient = await findClientForPhone(telefono, token);
    if (!dataClient) {
      setDataCliente(null);
      toast.error('Cliente no encontrado')
    } else {
      setDataCliente(dataClient);
      console.log(dataClient)
      toast.success('Cliente encontrado')
    }
  };
  const manejarEnvio = (event) => {
    event.preventDefault();
    // Aquí tu lógica de envío, por ejemplo, procesar los datos del formulario.
  };
  const handleKeyDown = (event) => {
    // Cancela el evento de submit si la tecla presionada es Enter
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const DataClient = () => {
    return (
      <>
        {
          dataCliente || visibleDataClient ?
            <div>
              <p>Nombre: {dataCliente?.name}</p>
              <p>Teléfono: {dataCliente?.phone}</p>
              <p>Id cliente: {dataCliente?.id}</p>
              <p>Cantidad de pedidos: {dataCliente?.orders?.length}</p>
            </div>
            :
            <div>
              <p>Cliente no encontrado</p>
            </div>}
      </>
    )
  }

  return (
    <div className='m-3'>
      <h3>Buscar Cliente</h3>
      {/* nunca mandar info al hacer submit */}
      <Form onSubmit={manejarEnvio} >
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
                  // className="mi-clase-personalizada-phone-input"
                  inputComponent={Form.Control}
                  onKeyDown={handleKeyDown}
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
      {/* si visibleDataClient es true podemos mostrar lo demás */}
      {visibleDataClient &&
        <DataClient />
      }
    </div>
  );
};

export default BuscadorCliente;
