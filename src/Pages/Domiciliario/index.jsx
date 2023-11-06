import { useContext } from 'react'
import { MiContexto } from '../../Context'
import NavbarDomiciliario from "../../components/NavbarDomiciliario";
import Layout from "../../components/Layout";
import Mapa from './../../components/MapsGoogle';
import ListMarker from '../../components/ListMarker';
import { Container, Row } from 'react-bootstrap';
import CarouselListCards from '../../components/CarouselListCards';


const Domiciliario = () => {
  const context = useContext(MiContexto)
  console.log("🚀 ~ file: index.jsx:15 ~ Domiciliario ~ context:", context)


  const containerStyle = {
    width: '100%', // Establece el ancho al 100% del contenedor padre
    height: '50vh', // Establece la altura al 100% de la altura de la ventana
  };
  const center = {
    lat: 6.29,
    lng: -75.576
  };


  return (
    <>
      <Layout>
        <NavbarDomiciliario
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />
        <Container fluid  >
          <Row >
            <Mapa
              center={center}
              containerStyle={containerStyle}
            >
              {
                context.items ? (<ListMarker
                  pedidos={context.items}
                />) : (<></>)
              }

            </Mapa>
          </Row>
          <Row>
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
