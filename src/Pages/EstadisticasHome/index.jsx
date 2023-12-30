import { useContext } from 'react'
import { MiContexto } from '../../Context'
import NavbarRecepcion from "../../components/NavbarRecepcion";
import Layout from "../../components/Layout";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import ListaEstadisticas from '../../components/ListaEstadisticas';
// import { ConfigProvider, theme } from 'antd';

//para mostra los pedidos en una tabla y tener las estadistica a la mano 
const EstadisticasHome = () => {
  const context = useContext(MiContexto)




  return (
    <>
      <Layout>
        <ContextProviderRecepcion >

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />

          <ListaEstadisticas
            lista={[
              { nombre: 'Domiciliarios', path: 'domiciliarios' }
            ]}
          />


        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default EstadisticasHome