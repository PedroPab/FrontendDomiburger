import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Button, Alert, Row, Col, InputGroup, Form } from 'react-bootstrap';
import { findClientForPhone } from '../../../../Utils/api/findClientPhone';
import { toast } from 'react-toastify';
import { BsXCircle } from 'react-icons/bs';
//styles
import './BuscadorTelefono.css';

const BuscadorTelefono = ({ setDataClient, token }) => {
  const [telefono, setTelefono] = useState('');
  const [clienteNoEncontrado, setClienteNoEncontrado] = useState(false);

  const buscarCliente = async () => {
    const dataClient = await findClientForPhone(telefono, token);
    if (!dataClient) {
      setDataClient(null);
      toast.error(`No se encontró un cliente`);
      setClienteNoEncontrado(true);
    } else {
      setDataClient(dataClient);
      toast.success(`Se encontró un cliente`);
      setClienteNoEncontrado(false);
    }
  };

  const borrarBusqueda = () => {
    setDataClient(null);
    setTelefono('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <Row className="justify-content-center mb-4 mt-4">
        <Col xs={12} md={8} lg={6}>
          <InputGroup className="d-flex align-items-center input-group-custom">
            <PhoneInput
              country="CO"
              defaultCountry="CO"
              value={telefono}
              onChange={setTelefono}
              inputComponent={Form.Control}
              onKeyDown={handleKeyDown}
              className="flex-grow-1"
            />
            <Button onClick={buscarCliente} className="mx-1 buscar-btn">Buscar</Button>
            <Button variant="outline-danger" onClick={borrarBusqueda} title="Limpiar búsqueda" className="borrar-btn">
              <BsXCircle />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="m-1 justify-content-center">
        {clienteNoEncontrado && (
          <Col xs={12} md={8} lg={6}>
            <Alert variant="warning" className="text-center">Cliente no encontrado</Alert>
          </Col>
        )}
      </Row>
    </>
  );
};

export default BuscadorTelefono;
