import { useState } from 'react';
import { Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import clientService from '../../../apis/client/ClientService';

const BuscadorClientePorNombre = ({ token, setClients }) => {
  const [nombre, setNombre] = useState('');

  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga

  const buscarCliente = async () => {
    if (!nombre) {
      toast.error("Por favor ingresa un número de teléfono válido.");
      return;
    }
    setIsLoading(true); // Mostrar spinner
    try {
      const filter = {
        filter: [
          {
            "key": "name",
            "type": "string",
            "value": nombre,
            "options": "=="
          }
        ]
      };
      const dataClientResponse = await clientService.getFilter({ filter: filter, token })
      const dataClient = dataClientResponse?.body.map((client) => client.data);
      if (!dataClient || dataClient.length === 0) {
        toast.error('Clientes no encontrado');
      } else {
        setClients(dataClient);
        toast.success('Clientes encontrado');
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
      <Form onSubmit={manejarEnvio} className="mb-4">
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Row className="align-items-center mb-3">
            <Col xs={12} md={8} className="mb-2 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
    </>
  );
};

export default BuscadorClientePorNombre;