import LayoutRecepcion from '../../../Layout/Recepcion'
import CrearCodigoReferidoYaCreadoComponent from '../../../components/Codigos/CrearCodigoReferido/CrearCodigoReferidoYaCreadoComponent'
import { useAuth } from '../../../Context/AuthContext'

const CrearCodigoReferidoYaCreado = () => {

  const { token } = useAuth()
  const userId = useAuth()?.usuarioActual?.uid
  return (
    <>
      <LayoutRecepcion>

        {/* crear codigo de referido */}
        <CrearCodigoReferidoYaCreadoComponent
          token={token}
          userId={userId}
        />


      </LayoutRecepcion >
    </>
  );

}

export default CrearCodigoReferidoYaCreado