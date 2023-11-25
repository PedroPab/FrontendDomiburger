import { useContext, useState } from 'react'
import { MiContexto } from '../../Context'
import { Container } from 'react-bootstrap';
import NavbarCocinero from "../../components/NavbarCocinero";
import Layout from "../../components/Layout";
import Mapa from "../../components/MapsGoogle"
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import SelectListDomiciliarios from '../../components/SelectListDomiciliarios';
import ListMarker from '../../components/ListMarker';
import StickyCard from '../../components/StickyCard';
import OrderCard from '../../components/OrderCard';

const MapCocina = () => {

  const context = useContext(MiContexto)

  const [centerMaps, setCenterMaps] = useState({
    lat: 6.29,
    lng: -75.576
  })

  const containerStyle = {
    width: '100%', // Establece el ancho al 100% del contenedor padre
    height: '90vh', // Establece la altura al 100% de la altura de la ventana
  };

  const indexPedido = context?.indexItems || 0

  const pedidoSelecionado = context?.items != null ? context?.items[indexPedido] : false


  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarCocinero
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
            pedidos={context.items}

          />
          <Container fluid  >
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
          </Container>

          {
            pedidoSelecionado &&
            (<StickyCard
              show={true}
            >
              <OrderCard
                dataPedido={pedidoSelecionado}
              />
            </StickyCard>)
          }

          <SelectListDomiciliarios />
        </ContextProviderRecepcion>

      </Layout >
    </>
  );

}

export default MapCocina