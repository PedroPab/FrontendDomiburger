import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import LayoutRecepcion from '../../Layout/Recepcion';
import { VisualizarClientesComponente } from '../../components/Client/VisualizarClientesComponente';

const Clientes = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  const userId = context.tokenLogin.user.id

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <VisualizarClientesComponente
            token={token}
            userId={userId} />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export default Clientes 