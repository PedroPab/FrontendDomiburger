import { useContext, useEffect, useState } from 'react'
import { MiContexto } from '../../Context'
import { NavbarDomiciliario } from "../../components/Navbar/NavbarDomiciliario";
import Layout from "../../components/Layout";
import Mapa from './../../components/MapsGoogle';
import ListMarker from '../../components/ListMarker';
import { Container, Row } from 'react-bootstrap';
import CarouselListCards from '../../components/CarouselListCards';


const Domiciliario = () => {
  const context = useContext(MiContexto)

  const [centerMaps, setCenterMaps] = useState({
    lat: 6.29,
    lng: -75.576
  })

  useEffect(() => {
    //cando cambie el index del pedido elegido se cambiara el center del mapa
    if (context.indexItems !== null) {
      setCenterMaps({
        lat: context.items[context.indexItems].address.coordinates.lat,
        lng: context.items[context.indexItems].address.coordinates.lng
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.indexItems])

  const containerStyle = {
    width: '100%', // Establece el ancho al 100% del contenedor padre
    height: '50vh', // Establece la altura al 100% de la altura de la ventana
  };

  return (
    <>
      <Layout>
        <NavbarDomiciliario
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
          pedidos={context.items}
        // recargarOrdenes={context.recargarOrdenes}
        />
        <Container fluid  >
          <Row className='mb-3'>
            <Mapa
              zoom={context.zoomMaps}
              setZoomMaps={context.setZoomMaps}
              modoOscuro={context.modoOscuro}
              center={centerMaps}
              setCenter={setCenterMaps}
              containerStyle={containerStyle}
            >
              {
                context.items ? (<ListMarker
                  pedidos={context.items}
                />) : (<></>)
              }
            </Mapa>
          </Row>
          <Row className=''>
            <CarouselListCards
              data={context.items}
            >
            </CarouselListCards>
          </Row>
        </Container>
      </Layout >
    </>
  );
};

export default Domiciliario;
