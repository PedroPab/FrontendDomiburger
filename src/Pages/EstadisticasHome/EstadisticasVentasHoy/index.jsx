import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../../Context'
import NavbarRecepcion from "../../../components/NavbarRecepcion";
import Layout from "../../../components/Layout";
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { UtilsApi } from '../../../Utils/utilsApi';
import GraficaVentasHoy from '../../../components/GraficaVentasHoy';

//para mostra los pedidos en una tabla y tener las estadistica a la mano 
const EstadisticasVentasHoy = () => {
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
    UtilsApi({ peticion: `pedidos/historialDia`, token, vervo: `GET` })
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
      peticion: `/estados/filter`, token, vervo: `POST`, body: JSON.stringify({ filter })
    })
      .then(data => {
        console.log("🚀 ~ file: index.jsx:46 ~ useEffect ~ data:", data)
        data = data.map(e => e.data)
        setPedidosAyer(data)
      })
      .catch(error => { console.log(error); })


  }, [token])






  const listPedidos = [
    { name: 'Hoy', data: pedidos, color: 'rgb(200, 28, 28)', dayInit: timeInitHoy },
    { name: 'mana', data: pedidosAyer, color: 'rgba(205, 201, 201, 0.84)', dayInit: fechaAyer },
  ]


  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />

          <GraficaVentasHoy
            listPedidos={listPedidos} />

        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default EstadisticasVentasHoy