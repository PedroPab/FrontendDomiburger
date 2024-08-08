//crear un componente que muestre la informacion de un cliente y saque el id del url y haga una url a la api para obtener la informacion del cliente

import { useContext, } from 'react';
import { useParams } from 'react-router-dom';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { MiContexto } from '../../../Context';
import { Container } from 'react-bootstrap';
import ClientInfo from '../../../components/Client/ClientInfo';

const ClienteInfo = () => {
  const { id } = useParams();
  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  // const userId = context.tokenLogin.user.id


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