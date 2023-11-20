/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap"
import { listaEstados } from "../../Utils/listEstados"
import { OrderCard } from "../../components/OrderCard"


export const ColsPedidos = ({ pedidos }) => {
  // dejamos solo la data

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

  return (
    <>
      {listPedidosEstados.map((estado, i) => {
        return (
          <Col
            key={i}
            style={{ width: '30rem' }}
          >
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