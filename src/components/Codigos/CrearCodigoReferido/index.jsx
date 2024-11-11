import { useEffect, useState } from 'react';
import BuscadorCliente from './BuscadorCliente';
import { createCodeReferidos } from '../../../Utils/api/codigos/createCodeReferidos';
import { toast } from 'react-toastify';
import BotonCrearCodigo from './BotonCrearCodigo';
import InputCodigoText from './InputCodigoText';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const CrearCodigoReferido = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('');
  const [codigo, setCodigo] = useState('');
  const [valid, setValid] = useState(false);
  const [dataCliente, setDataCliente] = useState(null);

  useEffect(() => {
    if (dataCliente && codigo) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [dataCliente, codigo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    //sacamos la data del formulario
    const data = {
      id: codigo,
      userCreate: userId,
      clientId: dataCliente.id,
      phoneClient: dataCliente.phone,
    }

    try {
      //enviamos la data al backend
      await createCodeReferidos(data, token)
      ///si todo fue un éxito , mostramos en la pantalla un mensaje y borramos el formulario , si no mostramos el error
      toast(`Todo fue un éxito :)`)
      setTelefono('');
      setCodigo('');
      setDataCliente(null);
    } catch (error) {
      alert(error);
      toast.error(error.message)
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
              <Form onSubmit={handleSubmit}>

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


                <div className="d-grid gap-2 mt-3">
                  <BotonCrearCodigo
                    valid={valid}
                    message='Asegúrate de tener el cliente y el código'
                    text='Crear Código de Referido'
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearCodigoReferido