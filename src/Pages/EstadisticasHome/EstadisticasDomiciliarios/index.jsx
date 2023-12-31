import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../../Context'
import NavbarRecepcion from "../../../components/NavbarRecepcion";
import Layout from "../../../components/Layout";
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { UtilsApi } from '../../../Utils/utilsApi';
import ListEstadisticasDomiciliarios from '../../../components/ListEstadisticasDomiciliarios';
import { ConfigProvider, theme } from 'antd';

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
        <ContextProviderRecepcion
          theme={{
            // 1. Use dark algorithm
            algorithm: context.modoOscuro ? theme.darkAlgorithm : null,
            // 2. Combine dark algorithm and compact algorithm
            // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          }}
        >

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />

          <ConfigProvider
            theme={{
              // 1. Use dark algorithm
              algorithm: context.modoOscuro ? theme.darkAlgorithm : null,
              // 2. Combine dark algorithm and compact algorithm
              // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
          >

            <ListEstadisticasDomiciliarios
              pedidos={pedidos}
            />
          </ConfigProvider>

        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default EstadisticasDomiciliarios