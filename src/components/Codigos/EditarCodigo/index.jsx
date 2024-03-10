import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InputCantidadNumber from '../CrearCodigoReferido/InputCantidadNumber';
import BuscadorCliente from '../CrearCodigoReferido/BuscadorCliente';
import { findCodigo } from '../../../Utils/api/codigos/findCodigo';

const EditarCodigoReferido = ({ token, id }) => {
  const [codigo, setCodigo] = useState(null);
  const [telefono, setTelefono] = useState('');
  const [dataCliente, setDataCliente] = useState(null);
  const [validCliente, setValidCliente] = useState(false);
  const [cantidadReferidos, setCantidadReferidos] = useState(0);
  const [cantidadPremios, setCantidadPremios] = useState(0);
  // const [messageInvalid, setMessageInvalid] = useState('Ingresa los datos');

  // const messageInvalids = [
  //   'Asegúrate de tener el cliente',
  //   'Asegúrate de tener el dato del codigo',
  //   'La cantidad de premios y referidos no coinciden, debe ser 1 premio por cada 3 referidos'
  // ]

  useEffect(() => {
    //buscamos le codigo
    findCodigo(id, token)
      .then(rta => {
        rta = rta.body;
        setCodigo(rta);
        setCantidadReferidos(rta.used.length)
        setCantidadPremios(rta.reward.length)
      })
      .catch(error => {
        console.log(error);
        toast.error('No se pudo encontrar el codigo');
        // deberíamos mandar un mensaje de error de 404
      })
  }, []);

  const editarCantidadReferidos = async () => {
    toast.info('Enviando datos');
  }

  //cada vez que cambie el cliente
  useEffect(() => {
    if (!dataCliente) {
      setValidCliente(false);
    }
    setValidCliente(true);
  }, [dataCliente])

  const modificarIdCliente = async () => {
    toast.info('Enviando datos');
    //miramos si hay un cliente en dataCliente
    if (!validCliente) return toast.error('Asegúrate de tener el cliente')

    //ejecutamos la función asíncrona de modificar el codigo y le pasamos el id del cliente
    // const rta = await modificarCodigo({idCliente: dataCliente.id, type: 'referidos'}, id, token);
    // if (rta) {
    //   toast.success('Se modifico el cliente');
    // }
    // else {
    toast.error('No se pudo modificar el cliente dueño del codigo');
    // }
  }


  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <h1>Editar codigo</h1>
          <Card>
            <Card.Body>
              <Card.Title className="text-center display-4 mt-2 mb-3 text-nowrap overflow-hidden text-truncate">{id}</Card.Title>
              {/* texto explicativo de que se va a hacer */}
              <p>Edita los datos de codigo de referidos</p>
              <p>Por motivos de permisos solo puedes cambiar los datos básicos</p>
              <br />

              {/* Buscador de cliente */}
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Editar cliente</Accordion.Header>
                  <Accordion.Body>

                    <BuscadorCliente
                      telefono={telefono}
                      setTelefono={setTelefono}
                      token={token}
                      dataCliente={dataCliente}
                      setDataCliente={setDataCliente}
                    />

                    <Row>
                      <Button
                        variant='success'
                        onClick={modificarIdCliente}
                        disabled={dataCliente ? false : true}
                      >
                        Modificar el dueño del codigo
                      </Button>
                    </Row>

                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Editar Referidos</Accordion.Header>
                  <Accordion.Body>
                    {/* Boton para modificar los referidos */}
                    <Form.Group className="mb-3">
                      <InputCantidadNumber
                        cantidad={cantidadReferidos}
                        setCantidad={setCantidadReferidos}
                        textLabel='Cantidad de referidos'
                        objButton={{
                          variant: 'success',
                          text: 'enviar',
                          onClick: editarCantidadReferidos

                        }}
                      />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Editar Premios</Accordion.Header>
                  <Accordion.Body>
                    <InputCantidadNumber
                      cantidad={cantidadPremios}
                      setCantidad={setCantidadPremios}
                      textLabel='Cantidad de premios'
                      objButton={{
                        variant: 'success',
                        text: 'enviar',
                        onClick: editarCantidadReferidos
                      }}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { EditarCodigoReferido };
