import { useContext, } from 'react'
import { MiContexto } from '../../Context/index.jsx'
import { ContextProviderRecepcion } from '../../Context/RecepcionContex.jsx';
import LayoutRecepcion from '../../Layout/Recepcion/index.jsx';
import { CrearProducto } from '../../components/Products/CrearProducto.jsx';

const CreateProduct = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <CrearProducto
            token={token}
          />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export default CreateProduct