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
            //tendrá un ancho fijo de 30 rm  en todo los tamaños
            className="col-11"

            // ponemos una separación entre cada columna y un espacio de 10px arriba
            style={{
              padding: '10px',
              height: '100%',
              width: '30rem',
            }}
          >
            {/* centramos el titulo  y lo ponemos de forma fija en la pantalla*/}
            <h3 className=" text-center">
              {estado.name}
              {/* mostramos en una un badge redondo pequeño como una notificación  en el titulo y con color de cuantos pedidos hay en ese estado  */}
              <span className="badge rounded-pill bg-warning text-dark  m-2">
                {estado.pedidos.length}
              </span>
            </h3>
            {/* creamos un contenedor para contener la lista de pedidos centrada horizontalmente pero no verticalmente , que sigan estando una debajo de la otra */}
            <div className="d-flex flex-column align-items-center "
              style={{
                height: '100%',
                overflow: 'auto'
              }}>
              {
                estado?.pedidos.map((pedido, i) => (
                  <OrderCard
                    key={i}
                    dataPedido={pedido}
                  />
                ))
              }
            </div>
          </Col>
        )
      })}
    </>

  )
}