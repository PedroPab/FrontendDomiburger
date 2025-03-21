import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { VisualizarCodigoReferidoComponente } from '../../../components/Codigos/VisualizarCodigoReferidoComponte';
import { useAuth } from '../../../Context/AuthContext';

const VisualizarCodigoReferidos = () => {

  const { token } = useAuth()
  const userId = useAuth()?.usuarioActual?.uid

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <VisualizarCodigoReferidoComponente
            token={token}
            userId={userId} />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export { VisualizarCodigoReferidos }