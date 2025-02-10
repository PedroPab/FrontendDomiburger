import { useContext, useState } from 'react';
import { MiContexto } from '../../../Context';
import { RecepcionContexto } from '../../../Context/RecepcionContex';
import { Col, Container, Row } from 'react-bootstrap';
import { NavbarRecepcion } from '../../../components/Navbar/NavbarRecepcion';
import Layout from '../../../components/Layout';
import Mapa from '../../../components/MapsGoogle';
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import SelectListDomiciliarios from '../../../components/SelectListDomiciliarios';
import StickyCard from '../../../components/StickyCard';
import Sidebar from '../../../components/Sidebar';
import ListOrder from './ListOrder';
import LayoutRecepcion from '../../../Layout/Recepcion';

const MapRecepcionContent = () => {
  // Uso de los contextos dentro del componente contenido, ya que aquí se encuentran envueltos por el Provider.
  const context = useContext(MiContexto);
  const recepcionContext = useContext(RecepcionContexto);
  const showSidebar = recepcionContext.openSidebarFilterDelivery;

  const [centerMaps, setCenterMaps] = useState({
    lat: 6.29,
    lng: -75.576,
  });

  const containerStyle = {
    width: '100%', // El mapa ocupará el 100% del ancho del contenedor padre
    height: '90vh', // El mapa ocupará el 90% de la altura de la ventana
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Si showSidebar es true, se renderiza el Sidebar; de lo contrario, el contenido ocupará todo el ancho */}
          {showSidebar && <Sidebar />}
          <Col xs={showSidebar ? 9 : 12} md={showSidebar ? 10 : 12}>
            <Mapa
              zoom={context.zoomMaps}
              setZoomMaps={context.setZoomMaps}
              modoOscuro={context.modoOscuro}
              center={centerMaps}
              setCenter={setCenterMaps}
              containerStyle={containerStyle}
            >
              <ListOrder items={context.items || []} />
            </Mapa>
          </Col>
        </Row>
      </Container>

      {context.idItemSelect && (
        <StickyCard show={true} pedidos={context.items}>
          {/* Aquí puedes agregar contenido adicional al StickyCard si lo requieres */}
        </StickyCard>
      )}

      <SelectListDomiciliarios />
    </>
  );
};

const MapRecepcion = () => {
  return (
    <LayoutRecepcion>
      {/* Se envuelve el contenido con el Provider correspondiente para que los hooks useContext funcionen correctamente */}
      <MapRecepcionContent />
    </LayoutRecepcion>
  );
};

export default MapRecepcion;
