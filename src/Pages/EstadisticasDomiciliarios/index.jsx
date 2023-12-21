import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../Context'
import NavbarRecepcion from "../../components/NavbarRecepcion";
import Layout from "../../components/Layout";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import { UtilsApi } from '../../Utils/utilsApi';
import ListEstadisticasDomiciliarios from '../../components/ListEstadisticasDomiciliarios';

//para mostra los pedidos en una tabla y tener las estadistica a la mano 
const EstadisticasDomiciliarios = () => {
  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  //los pedidos qeu se muestran en la tabla
  const [pedidos, setPedidos] = useState([])
  //pedimos todos lo pedios del dia
  useEffect(() => {
    UtilsApi({ peticion: `pedidos/historialDia`, token, vervo: `GET` })
      .then(data => {
        data = data.map(e => e.data)
        setPedidos(data)
      })
      .catch(error => { console.log(error); })
  }, [token])




  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />

          <ListEstadisticasDomiciliarios
            pedidos={pedidos}
          />

        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default EstadisticasDomiciliarios