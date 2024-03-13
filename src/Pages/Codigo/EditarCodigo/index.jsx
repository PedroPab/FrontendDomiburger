import { useContext, } from 'react'
import { MiContexto } from '../../../Context'
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { useParams } from 'react-router-dom';
import { EditarCodigoReferido } from '../../../components/Codigos/EditarCodigo';

const EditarCodigo = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  // const userId = context.tokenLogin.user.id
  const { id: idCodigo } = useParams();

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>
          <EditarCodigoReferido
            token={token}
            id={idCodigo}
          />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export { EditarCodigo }