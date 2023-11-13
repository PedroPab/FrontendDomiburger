import { useContext, useState } from 'react'
import { MiContexto } from '../../Context'
import NavbarDomiciliario from "../../components/NavbarDomiciliario";
import Layout from "../../components/Layout";
import Mapa from './../../components/MapsGoogle';
import ListMarker from '../../components/ListMarker';
import { Container, Row } from 'react-bootstrap';
import CarouselListCards from '../../components/CarouselListCards';
import { ROLES } from '../../Utils/constList';
import { Navigate } from 'react-router-dom';


const Domiciliario = () => {
  const context = useContext(MiContexto)
  let redireccionar = { ok: false, to: '/login' }
  console.log(`context.tokenLogin`, context.tokenLogin);
  if (context.tokenLogin) {
    if (context.tokenLogin?.user?.role !== ROLES.domiciliario) {
      console.log(context.tokenLogin?.user?.role, 'hcontext.loginToken?.user?.role');
      redireccionar.ok = true
    }

  }
  if (context.tokenLogin == undefined) {
    console.log(`no hay token`);
    redireccionar.ok = true
  }

  const [centerMaps, setCenterMaps] = useState({
    lat: 6.29,
    lng: -75.576
  })

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
        />
        <Container fluid  >
          <Row className='mb-3'>
            <Mapa
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
      {redireccionar.ok && <Navigate to={redireccionar.to} />}
    </>
  );
};

export default Domiciliario;
