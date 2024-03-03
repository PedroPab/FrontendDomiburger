import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import BuscadorCliente from './BuscadorCliente';
import InputCodigoText from './InputCodigoText';
import InputCantidadNumber from './InputCantidadNumber'; // Asumiendo que este es el nombre correcto del componente
import { createCodeReferidos } from '../../../Utils/api/codigos/createCodeReferidos';
import { toast } from 'react-toastify';
import BotonCrearCodigo from './BotonCrearCodigo';

const CrearCodigoReferidoYaCreadoComponent = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('+573054489598');
  const [codigo, setCodigo] = useState('');
  const [valid, setValid] = useState(false);
  const [dataCliente, setDataCliente] = useState(null);
  const [cantidadReferidos, setCantidadReferidos] = useState(0);
  const [cantidadPremios, setCantidadPremios] = useState(0);
  const [messageInvalid, setMessageInvalid] = useState('Ingresa los datos');

  const messageInvalids = [
    'Asegúrate de tener el cliente',
    'Asegúrate de tener el dato del codigo',
    'La cantidad de premios y referidos no coinciden, debe ser 1 premio por cada 3 referidos'
  ]

  useEffect(() => {
    if (!dataCliente) {
      setValid(false)
      setMessageInvalid(messageInvalids[0])
      return
    }
    if (!codigo) {
      setValid(false)
      setMessageInvalid(messageInvalids[1])
      return
    }
    if (cantidadPremios * 3 > cantidadReferidos) {
      setValid(false)
      setMessageInvalid(messageInvalids[2])
      return
    }
    setValid(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCliente, codigo, cantidadPremios, cantidadReferidos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: codigo,
      userCreate: userId,
      clientId: dataCliente.id,
      phoneClient: dataCliente.phone,
      usedImport: cantidadReferidos,
      rewardImport: cantidadPremios,
    };

    try {
      await createCodeReferidos(data, token);
      toast("todo fue un éxito ");
      setTelefono('');
      setCodigo('');
      setDataCliente(null);
      setCantidadPremios(0);
      setCantidadReferidos(0)
    } catch (error) {
      toast.error(error?.body);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h1>Crear Código de Referido</h1>
              </Card.Title>
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
                <br />
                <InputCantidadNumber
                  cantidad={cantidadReferidos}
                  setCantidad={setCantidadReferidos}
                  textLabel='Cantidad de referidos'
                />
                <br />
                <InputCantidadNumber
                  cantidad={cantidadPremios}
                  setCantidad={setCantidadPremios}
                  textLabel='Cantidad de premios'
                />

                <div className="d-grid gap-2 mt-3">
                  <BotonCrearCodigo
                    valid={valid}
                    message={messageInvalid}
                    text='Crear Código de Referido'
                  />
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
