import { Container } from "react-bootstrap"
import Mapa from "../../components/MapsGoogle"
import { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";


const MapClient = ({ coordinates }) => {

  const [centerMaps, setCenterMaps] = useState({
    lat: 6.29,
    lng: -75.576
  })
  useEffect(() => {
    if (!coordinates) return
    setCenterMaps(coordinates)
  }, [coordinates])

  const containerStyle = {
    width: '100%', // Establece el ancho al 100% del contenedor padre
    height: '20vh', // Establece la altura al 100% de la altura de la ventana
  };

  return (
    <>
      <Container fluid  >
        <Mapa
          center={centerMaps}
          setCenter={setCenterMaps}
          containerStyle={containerStyle}
        >
          {/* {
            coordinates &&
            <Marker
              position={coordinates}
              title='title'
              animation='DROP'
              label={``}
              clickable={true}
              // icon={iconMarker}
              visible={true}
            // onClick={() => {
            //   const index = context.items.findIndex(e => e.id == pedido.id)
            //   context.setIndexItems(index == -1 ? null : index)
            // }}
            />
          } */}
        </Mapa>
      </Container>
    </>
  )
}

export default MapClient