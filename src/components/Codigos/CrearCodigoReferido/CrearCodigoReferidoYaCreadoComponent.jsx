import { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import BuscadorCliente from './BuscadorCliente';
import InputCodigoText from './InputCodigoText';
import InputCantidadNumber from './InputCantidadNumber'; // Asumiendo que este es el nombre correcto del componente
import { createCodeReferidos } from '../../../Utils/api/codigos/createCodeReferidos';
import { toast } from 'react-toastify';

const CrearCodigoReferidoYaCreadoComponent = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('+573054489598');
  const [codigo, setCodigo] = useState('');
  const [valid, setValid] = useState(false);
  const [dataCliente, setDataCliente] = useState(null);
  const [cantidadReferidos, setCantidadReferidos] = useState(0);
  const [cantidadPremios, setCantidadPremios] = useState(0);

  useEffect(() => {
    if (dataCliente && codigo) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [dataCliente, codigo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: codigo,
      userCreate: userId,
      clientId: dataCliente.id,
      phoneClient: dataCliente.phone,
    };

    try {
      await createCodeReferidos(data, token);
      toast("todo fue un éxito ");
      setTelefono('');
      setCodigo('');
      setDataCliente(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <Card>
            <Card.Body>
              <Card.Title>Crear Código de Referido</Card.Title>
              <form onSubmit={handleSubmit}>
                <BuscadorCliente
                  telefono={telefono}
                  setTelefono={setTelefono}
                  dataCliente={dataCliente}
                  setDataCliente={setDataCliente}
                  token={token}
                />

                <InputCodigoText
                  codigo={codigo}
                  setCodigo={setCodigo}
                />

                <InputCantidadNumber
                  cantidad={cantidadReferidos}
                  setCantidad={setCantidadReferidos}
                />

                <InputCantidadNumber
                  cantidad={cantidadPremios}
                  setCantidad={setCantidadPremios}
                />

                <div className="d-grid gap-2 mt-3">
                  <Button
                    type="submit"
                    disabled={!valid}
                    variant="primary"
                  >Crear Código</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearCodigoReferidoYaCreadoComponent;
