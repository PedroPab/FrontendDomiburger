import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import LayoutRecepcion from '../../../Layout/Recepcion';
import { useParams } from 'react-router-dom';
import { EditarCodigoReferido } from '../../../components/Codigos/EditarCodigo';
import { useAuth } from '../../../Context/AuthContext';

const EditarCodigo = () => {

  const { token } = useAuth()
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