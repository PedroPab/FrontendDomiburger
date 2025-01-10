import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import LayoutRecepcion from '../../Layout/Recepcion';
import { PedidoDetalles } from '../../components/Pedidos/PedidoDetalles.jsx';

const PedidosDetails = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <PedidoDetalles token={token} />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export default PedidosDetails