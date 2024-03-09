import { useEffect, useState, } from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, } from 'react-bootstrap';
import { findClientForId } from '../../../Utils/api/findClientId';
import ClientCard from '../ClientCard';

const ClientInfo = ({ token, idClient }) => {
  const [client, setClient] = useState(null)

  useEffect(() => {
    //consultamos el cliente por el id
    findClientForId(idClient, token)
      .then(client => {
        setClient(client)
      })
      .catch(err => {
        toast.error(`Error al buscar el cliente: ${err}`)
      })
  }, [idClient, token])


  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          {client ?
            <ClientCard cliente={client} /> :
            <h3>404</h3>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default ClientInfo