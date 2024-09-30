import { useState } from 'react';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { findClientForPhone } from "../../../Utils/api/findClientPhone";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-toastify';
import ClientDetails from './ClientDetails';

const BuscadorCliente = ({
  telefono,
  setTelefono,
  token,
  dataCliente,
  setDataCliente,
  visibleDataClient = true
}) => {
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga

  const buscarCliente = async () => {
    if (!telefono) {
      toast.error("Por favor ingresa un número de teléfono válido.");
      return;
    }
    setIsLoading(true); // Mostrar spinner
    try {
      const dataClient = await findClientForPhone(telefono, token);
      if (!dataClient) {
        setDataCliente(null);
        toast.error('Cliente no encontrado');
      } else {
        setDataCliente(dataClient);
        toast.success('Cliente encontrado');
      }
    } catch (error) {
      toast.error("Error al buscar cliente.");
    } finally {
      setIsLoading(false); // Ocultar spinner
    }
  };

  const manejarEnvio = (event) => {
    event.preventDefault();
    // Lógica adicional para manejar el envío
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <h3 className="mb-4">Buscar Cliente</h3>
      <Form onSubmit={manejarEnvio} >
        <Form.Group controlId="formTelefono">
          <Form.Label>Teléfono:</Form.Label>
          <Row className="align-items-center">
            <Col xs={12} md={8}>
              <PhoneInput
                placeholder="Ingresa el número de teléfono"
                value={telefono}
                onChange={setTelefono}
                country="CO"
                defaultCountry="CO"
                inputComponent={Form.Control}
                onKeyDown={handleKeyDown}
              />
            </Col>
            <Col xs={12} md={4}>
              <Button
                variant="primary"
                onClick={buscarCliente}
                disabled={isLoading} // Deshabilitar mientras se carga
                className="w-100"
              >
                {isLoading ? <Spinner animation="border" size="sm" /> : "Buscar Cliente"}
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>

      {/* Mostrar los datos del cliente si visibleDataClient es true */}
      {visibleDataClient &&
        <ClientDetails cliente={dataCliente} />
      }
    </>
  );
};

export default BuscadorCliente;