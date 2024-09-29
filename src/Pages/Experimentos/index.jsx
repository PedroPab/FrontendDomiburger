import { useState } from "react";
import LayoutRecepcion from "../../Layout/Recepcion";
import MapComponent from "./MapComponent";
const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };

const Experimentos = () => {
  const [coordinates, setCoordinates] = useState(centerOrigin);

  return (
    <>
      <LayoutRecepcion>
        <h1>Experimentos</h1>

        <p>Esta es una página de experimentos</p>
        <p>para crear el mapa de google maps con el autocompleted y el posicionamiento manual</p>
        <MapComponent
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />

      </LayoutRecepcion>
    </>
  );
};

export default Experimentos;
