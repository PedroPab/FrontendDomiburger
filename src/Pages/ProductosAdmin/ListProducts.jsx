import { useContext, } from 'react'
import { MiContexto } from '../../Context/index.jsx'
import { ContextProviderRecepcion } from '../../Context/RecepcionContex.jsx';
import LayoutRecepcion from '../../Layout/Recepcion/index.jsx';
import { VisualizarProductos } from '../../components/Products/Views/VisualizarProductos.jsx';

const ListProducts = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  return (
    <>
      <LayoutRecepcion>
        <ContextProviderRecepcion>

          <VisualizarProductos
            token={token}
          />

        </ContextProviderRecepcion>

      </LayoutRecepcion >
    </>
  );

}

export default ListProducts