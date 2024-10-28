//crear un componente que muestre la informacion de un cliente y saque el id del url y haga una peticion a la api para obtener la informacion del cliente

import { useContext, } from 'react';
import LayoutRecepcion from '../../Layout/Recepcion';
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import { MiContexto } from '../../Context';
import { Container } from 'react-bootstrap';

const Cliente = () => {
  const context = useContext(MiContexto)
  // const token = context.tokenLogin.token
  // const userId = context.tokenLogin.user.id


  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>
          <Container fluid>
            <h1>Clientes</h1>

            {/* crear un cliente */}
            <div>
              <button>Crear Cliente</button>
            </div>

            {/* buscar cliente por numero */}

          </Container>
        </ContextProviderRecepcion>
      </LayoutRecepcion>
    </>
  );
};

export { Cliente };