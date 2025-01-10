import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import LayoutRecepcion from '../../Layout/Recepcion';
import { VisualizarPedidosComponente } from '../../components/Pedidos/VisualizarPedidosComponente.jsx';

const Pedidos = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <VisualizarPedidosComponente
            token={token}
          />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export default Pedidos