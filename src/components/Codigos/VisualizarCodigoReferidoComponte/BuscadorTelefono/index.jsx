import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { Button, Alert, Row, InputGroup, Form } from 'react-bootstrap';
import { findClientForPhone } from '../../../../Utils/api/findClientPhone';
import { toast } from 'react-toastify';
import { BsXCircle } from 'react-icons/bs';

const BuscadorTelefono = ({ setDataClient, token }) => {
  const [telefono, setTelefono] = useState('');
  const [clienteNoEncontrado, setClienteNoEncontrado] = useState(false);


  const buscarCliente = async () => {
    const dataClient = await findClientForPhone(telefono, token);
    if (!dataClient) {
      setDataClient(null);
      toast.error(`no se encontró un cliente`);
      setClienteNoEncontrado(true)
    } else {
      setDataClient(dataClient);
      toast.success(`se encontró un cliente`);
      setClienteNoEncontrado(false)
    }
  };
  const borrarBusqueda = () => {
    setDataClient(null);
    setTelefono('')
  }
  const handleKeyDown = (event) => {
    // Cancela el evento de submit si la tecla presionada es Enter
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  return (
    <>
      <Row className=" flex justify-content-center mb-4 mt-4">
        <InputGroup className="flex justify-content-center w-50">
          <div className="flex-grow-1">
            <PhoneInput
              country="CO"
              defaultCountry="CO"
              value={telefono}
              onChange={setTelefono}
              containerClass="flex-grow-1" // Clase para hacer que el PhoneInput se expanda
              inputComponent={Form.Control}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={buscarCliente} className="ms-2">Buscar</Button>
          <Button variant="outline-danger" onClick={borrarBusqueda} title="Limpiar búsqueda">
            <BsXCircle />
          </Button>
        </InputGroup>

      </Row>
      <Row className="justify-content-center mb-4 mt-4">
        {clienteNoEncontrado && <Alert variant="warning" className="mt-3 w-50">Cliente no encontrado</Alert>}
      </Row>
    </>

  );
};

export default BuscadorTelefono;
