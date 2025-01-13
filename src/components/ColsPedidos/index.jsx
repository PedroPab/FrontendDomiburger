/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap"
import { listaEstados } from "../../Utils/listEstados"
import { OrderCard } from "../../components/OrderCard"
import { useContext, useEffect, useState } from "react"
import { RecepcionContexto } from "../../Context/RecepcionContex"


export const ColsPedidos = ({ pedidos }) => {
  //miramos los cambios de domiciliarioIdFilter del contexto
  const { domiciliarioIdFilter } = useContext(RecepcionContexto)
  const [filteredPedidos, setFilteredPedidos] = useState(pedidos)

  useEffect(() => {
    console.log('domiciliarioIdFilter', domiciliarioIdFilter);
    // si es un id valido filtramos los pedidos que tengan ese domiciliario
    if (domiciliarioIdFilter) {
      setFilteredPedidos(pedidos.filter(pedido => pedido?.domiciliario_asignado?.id === domiciliarioIdFilter))
    } else {
      setFilteredPedidos(pedidos)
    }
  }, [domiciliarioIdFilter, pedidos])

  //el orden de los estados
  const listPedidosEstados = listaEstados.map(estado => {

    return {
      name: estado.name,
      pedidos: []
    }
  })

  //ponemos los pedido en el estado que le corresponde
  filteredPedidos.forEach(pedido => {
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
              height: '90%',
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