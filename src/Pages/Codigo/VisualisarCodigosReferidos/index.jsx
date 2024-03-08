import { useContext, } from 'react'
import { MiContexto } from '../../../Context'
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { VisualizarCodigoReferidoComponte } from '../../../components/Codigos/VisualizarCodigoReferidoComponte';

const VisualizarCodigoReferidos = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  const userId = context.tokenLogin.user.id

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <VisualizarCodigoReferidoComponte
            token={token}
            userId={userId} />


        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export { VisualizarCodigoReferidos }