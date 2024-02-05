import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../Context'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
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

    if (arrayFilter.length <= 0) return

    const filter = JSON.stringify({ filter: arrayFilter })
    UtilsApi({ peticion: `estados/filter`, token, vervo: `POST`, body: filter })
      .then(data => {
        data = data.map(e => e.data)
        setPedidos(data)
      })
      .catch(error => { console.log(error); })
  };
  const rtaEstadisticas = (pedidosData) => {
    let totalDeVentas = 0,
      numeroDeVentas = 0,
      NumeroDeRegistros = pedidosData.length,
      totalDeTrasferencias = 0,
      totalDeEfectivo = 0,
      totalDeCombos = 0,
      totalDeHamburguesas = 0,
      totalDeDomicilios = 0,
      TotalDeCostosProductos = 0,
      TotalDeCostosGaseosas = 0,
      totalDeGaseosas = 0

    pedidosData.forEach(element => {
      // element = element.data

      //conatamos el valor de las ventas
      //si el pedido esta en eliminanos no se contarar en el total de dle valor de venta
      // deberia de retornar si el estado es elmininadso para aurar tantoa codiogo 
      if (element.estado == 'Eliminados') {
        return
      }

      numeroDeVentas += 1
      totalDeVentas += element.priceTotal.priceTotal

      ///miramso si es de de efectivo o tranferencia 

      if (element?.pagoConfirmado?.confirmado) {
        if (element.fee == 'Efectivo') {
          totalDeEfectivo += element.priceTotal.priceTotal
        } else if (element.fee == 'Transferencia') {
          totalDeTrasferencias += element.priceTotal.priceTotal
        }
      }

      //constamso la cantiddad de combos 
      let comboContador = 0
      let hamburguesaContador = 0
      let domicilioContador = 0

      element.order.forEach(producto => {
        switch (producto.id) {
          case `1`:
            comboContador += 1
            TotalDeCostosProductos += producto.price

            break;
          case `2`:
            hamburguesaContador += 1
            TotalDeCostosProductos += producto.price
            break
          default:
            if (producto.type == 'domicilio') {
              domicilioContador += producto.price
            }
            break;
        }

        const { contadorProducto, contadorCosteProducto } = contieneAdicionGaseosa(producto.modifique || [], ['9', '10'])
        totalDeGaseosas += contadorProducto
        TotalDeCostosGaseosas += contadorCosteProducto
      })

      totalDeCombos += comboContador
      totalDeHamburguesas += hamburguesaContador
      totalDeDomicilios += domicilioContador
      //si es de tranferecia miramos si estas confiramado le pago y los  separamos

      //miramos si tiene una adicion de gaseosa para hacer le conteo
      /**
       * tratamos de
       * @param {Array} adiciones
       * @param {String[] | String} idAdicion
       * @param {Number} contadorProducto
       * @param {Number} contadorCosteProducto
       */
      function contieneAdicionGaseosa(adiciones, idAdicion) {
        if (typeof (idAdicion) == 'string') idAdicion = [idAdicion]

        let contadorProducto = 0, contadorCosteProducto = 0
        adiciones.map(adicion => {
          if (idAdicion.includes(adicion.id)) {
            contadorProducto = contadorProducto + 1
            contadorCosteProducto = contadorCosteProducto + adicion.price
          }
        })
        return { contadorProducto, contadorCosteProducto }
      }

    });

    return {
      totalDeVentas,
      numeroDeVentas,
      NumeroDeRegistros,
      totalDeTrasferencias,
      totalDeEfectivo,
      totalDeCombos,
      totalDeHamburguesas,
      totalDeDomicilios,
      TotalDeCostosProductos,
      TotalDeCostosGaseosas,
      totalDeGaseosas,
    }
  }

  const rta = rtaEstadisticas(pedidos)


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

            <Row className='mb-3'>
              <Container>
                <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <Row>
                          <p>Numero de ventas: <span>{rta.numeroDeVentas}</span></p>
                        </Row>
                        <Row>
                          <p>Numero de registros: <span>{rta.NumeroDeRegistros}</span></p>
                        </Row>
                        <Row>
                          <p>Total de combos: <span>{rta.totalDeCombos}</span></p>
                        </Row>
                        <Row>
                          <p>Total de hamburguesas: <span>{rta.totalDeHamburguesas}</span></p>
                        </Row>
                        <Row>
                          <p>Total de domicilios: <span>{rta.totalDeDomicilios}</span></p>
                        </Row>
                        <Row>
                          <p>Total de precios de productos: $<span>{rta.TotalDeCostosProductos}</span></p>
                        </Row>
                      </Col>

                      <Col>
                        <Row>
                          <p>Total de ventas: $<span>{rta.totalDeVentas}</span></p>
                        </Row>
                        <Row>
                          <p>Total de transferencias:  $<span>{rta.totalDeTrasferencias}</span></p>
                        </Row>
                        <Row>
                          <p>Total de efectivo: $<span>{rta.totalDeEfectivo}</span></p>
                        </Row>
                        <Row>
                          <p>Total de gaseosas: <span>{rta.totalDeGaseosas}</span></p>
                        </Row>
                        <Row>
                          <p>Total de ventas gaseosas: $<span>{rta.TotalDeCostosGaseosas}</span></p>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>

                </Card>

              </Container>
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