import { useParams } from 'react-router-dom';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { Container } from 'react-bootstrap';
import ClientInfo from '../../../components/Client/ClientInfo';
import { useAuth } from '../../../Context/AuthContext';

const ClienteInfo = () => {
  const { id } = useParams();
  const { token } = useAuth()


  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>
          <Container fluid>
            <ClientInfo
              token={token}
              idClient={id}
            />
          </Container>
        </ContextProviderRecepcion>
      </LayoutRecepcion>
    </>
  );
};

export default ClienteInfo;