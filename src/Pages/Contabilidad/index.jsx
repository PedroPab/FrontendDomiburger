import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../Context'
import { Container, Row } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import TablaListaPedidos from "../../components/TablaListaPedidos";
import Layout from "../../components/Layout";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import { UtilsApi } from '../../Utils/utilsApi';
import FormulariFiltros from '../../components/FormulariFiltros';

//para mostra los pedidos en una tabla y tener las estadistica a la mano 
const Contabilidad = () => {
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
  const buscarPorFiltro = async (arrayFilter) => {
    // Lógica para buscar por filtro

    arrayFilter = arrayFilter.filter(e => e != null)

    const filter = JSON.stringify({ filter: arrayFilter })
    UtilsApi({ peticion: `estados/filter`, token, vervo: `POST`, body: filter })
      .then(data => {
        data = data.map(e => e.data)
        setPedidos(data)
      })
      .catch(error => { console.log(error); })
  };


  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />
          <Container fluid  >
            <Row  >
              <FormulariFiltros
                onBuscar={buscarPorFiltro}
              />
            </Row>
            <Row  >
              <TablaListaPedidos
                pedidos={pedidos}
              />
            </Row>
          </Container >
        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default Contabilidad