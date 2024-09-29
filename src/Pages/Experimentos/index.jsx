import { useState } from "react";
import LayoutRecepcion from "../../Layout/Recepcion";
import MapComponent from "../../components/MapComponent/MapComponent";
const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };

const Experimentos = () => {
  const [coordinates, setCoordinates] = useState(centerOrigin);
  const [input, setInput] = useState({
    address_complete: "",
    piso: "",
    valid: false,
  });

  return (
    <>
      <LayoutRecepcion>
        <h1>Experimentos</h1>

        <p>Esta es una página de experimentos</p>
        <p>para crear el mapa de google maps con el autocompleted y el posicionamiento manual</p>
        <MapComponent
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          stateDireccion={[input, setInput]}
        />

        {/* mostramos de forma bonita la direccion y si la tenemos o no  */}
        <p>
          <strong>Dirección:</strong> {input.address_complete}
        </p>
        <p>
          <strong>Piso:</strong> {input.piso}
        </p>
        <p>
          <strong>Valid:</strong> {input.valid ? "Sí" : "No"}
        </p>
        {/* y las coordenadas */}
        <p>
          <strong>Latitud:</strong> {coordinates.lat}
        </p>
        <p>
          <strong>Longitud:</strong> {coordinates.lng}
        </p>


      </LayoutRecepcion>
    </>
  );
};

export default Experimentos;
