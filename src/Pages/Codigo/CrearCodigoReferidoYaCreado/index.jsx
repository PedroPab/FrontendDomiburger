import { useContext, } from 'react'
import { MiContexto } from '../../../Context'
import LayoutRecepcion from '../../../Layout/Recepcion'
import CrearCodigoReferidoYaCreadoComponent from '../../../components/Codigos/CrearCodigoReferido/CrearCodigoReferidoYaCreadoComponent'


const CrearCodigoReferidoYaCreado = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  const userId = context.tokenLogin.user.id

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