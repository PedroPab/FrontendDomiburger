/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap"
import { listaEstados } from "../../Utils/listEstados"
import { OrderCard } from "../../components/OrderCard"


export const ColsPedidos = ({ pedidos }) => {
  // dejamos solo la data
  pedidos = pedidos.map(e => (e.data))
  console.log("🚀 ~ file: index.jsx:8 ~ ColsPedidos ~ pedidos:", pedidos)

  //el orden de los estados 
  const listPedidosEstados = listaEstados.map(estado => {

    return {
      name: estado.name,
      pedidos: []
    }
  })

  //ponemos los pedido en el estado que le corresponde
  pedidos.forEach(pedido => {
    const estado = listPedidosEstados[listPedidosEstados.findIndex(e => e.name == pedido.estado)]

    if (!estado) {
      console.log(`no es un estado valido ${pedido}`);
      return
    }
    estado.pedidos.push(pedido)
    return
  });
  console.log("🚀 ~ file: index.jsx:13 ~ listPedidosEstados ~ listPedidosEstados:", listPedidosEstados)



  return (
    <>
      {listPedidosEstados.map((estado, i) => {
        return (
          <Col
            sm={3}
            key={i}>
            <h4>{estado.name}</h4>

            {
              estado?.pedidos.map((pedido, i) => (
                <OrderCard
                  key={i}
                  dataPedido={pedido}
                />
              ))
            }
          </Col>
        )
      })}
    </>

  )
}