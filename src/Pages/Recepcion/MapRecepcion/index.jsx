import { useContext, useState } from 'react'
import { MiContexto } from '../../../Context'
import { Col, Container, Row } from 'react-bootstrap';
import { NavbarRecepcion } from "../../../components/Navbar/NavbarRecepcion";
import Layout from "../../../components/Layout";
import Mapa from "../../../components/MapsGoogle"
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import SelectListDomiciliarios from '../../../components/SelectListDomiciliarios';
import StickyCard from '../../../components/StickyCard';
import OrderCard from '../../../components/OrderCard';
import Sidebar from '../../../components/Sidebar';
import ListOrder from './ListOrder';

const MapRecepcion = () => {

  const context = useContext(MiContexto)

  const [centerMaps, setCenterMaps] = useState({
    lat: 6.29,
    lng: -75.576
  })

  const containerStyle = {
    width: '100%', // Establece el ancho al 100% del contenedor padre
    height: '90vh', // Establece la altura al 100% de la altura de la ventana
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
            <Row>
              <Sidebar />
              <Col xs={9} md={10}>
                <Mapa
                  zoom={context.zoomMaps}
                  setZoomMaps={context.setZoomMaps}
                  modoOscuro={context.modoOscuro}
                  center={centerMaps}
                  setCenter={setCenterMaps}
                  containerStyle={containerStyle}
                >
                  <ListOrder
                    items={context.items || []}
                  />


                </Mapa>
              </Col>
            </Row>
          </Container>

          {
            context.idItemSelect &&
            (<StickyCard
              show={true}
              pedidos={context?.items}
            >

            </StickyCard>)
          }

          <SelectListDomiciliarios />
        </ContextProviderRecepcion>

      </Layout >
    </>
  );

}

export default MapRecepcion