import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../../Context'
import Layout from "../../../components/Layout";
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { UtilsApi } from '../../../Utils/utilsApi';
import GraficaCLientesNuevos from '../../../components/GraficaCLientesNuevos';
// eslint-disable-next-line no-unused-vars
// import Pedido from '../../../Utils/class/Pedido';
import { NavbarRecepcion } from '../../../components/Navbar/NavbarRecepcion';

//para mostra los pedidos en una tabla y tener las estadistica a la mano 
const EstadisticasClientes = () => {
  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  //los pedidos qeu se muestran en la tabla
  const [pedidos, setPedidos] = useState([])
  const [pedidosAyer, setPedidosAyer] = useState([])

  //

  const timeInitHoy = new Date();
  timeInitHoy.setHours(15, 0, 0, 0);
  const fechaAyer = new Date();
  fechaAyer.setDate(fechaAyer.getDate() - 1);

  //pedimos todos lo pedios del dia
  useEffect(() => {
    UtilsApi({ url: `pedidos/historialDia`, token, method: `GET` })
      .then(data => {
        data = data.map(e => e.data)
        setPedidos(data)
      })
      .catch(error => { console.log(error); })



    const filter = [{
      "key": "date",
      "options": ">=",
      "type": "Date",
      "value": fechaAyer
    }]
    UtilsApi({
      url: `/estados/filter`, token, method: `POST`, body: JSON.stringify({ filter })
    })
      .then(data => {
        data = data.map(e => e.data)
        setPedidosAyer(data)
      })
      .catch(error => { console.log(error); })


  }, [token])




  /**
   * @param {Pedido[]} pedidos
   */
  const conteoPedidos = (pedidos) => {
    return pedidos.length
  }

  /**
 * @param {Pedido[]} pedidos
 */


  const listPedidos = {
    title: 'Clientes nuevos',
    graps: [
      {
        name: 'Hoy',
        data: pedidos,
        color: 'rgb(200, 28, 28)',
        dayInit: timeInitHoy,
        backgroundColor: 'rgba(23, 19, 255, 0.47)',
        callbackReduceData: conteoPedidos
      },
      {
        name: 'Ayer',
        data: pedidosAyer,
        color: 'rgba(0, 0, 0, 0.84)',
        dayInit: fechaAyer,
        backgroundColor: 'rgba(255, 70, 70, 0.94)',
        callbackReduceData: conteoPedidos
      },
    ]
  }



  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />

          <GraficaCLientesNuevos
            listPedidos={listPedidos.graps}
            title={listPedidos.title}
            nameValueY={listPedidos.nameValueY}
          />


        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default EstadisticasClientes