import { useContext, } from 'react'
import { MiContexto } from '../../../Context'
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { default as CrearCodigoReferidoComponent } from '../../../components/Codigos/CrearCodigoReferido';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { useAuth } from '../../../Context/AuthContext';

const CrearCodigoReferido = () => {

  const context = useContext(MiContexto)
  const { token } = useAuth()
  const userId = context.tokenLogin.user.id

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>


          {/* crear codigo de referido */}
          <CrearCodigoReferidoComponent
            token={token}
            userId={userId}
          />



        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export default CrearCodigoReferido