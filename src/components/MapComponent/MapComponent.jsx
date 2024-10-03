import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import FormField from "../FormField"; // Suponiendo que FormField es un componente reutilizable
import { BiLogoGoogle } from "react-icons/bi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";

// const ENV = import.meta.env;

// const libraries = ["places"];

const MapComponent = ({ coordinates, setCoordinates, stateDireccion }) => {
  const [direccion, setDireccion] = stateDireccion;
  const [manualSelect, setManualSelect] = useState(false);
  const autocompleteRef = useRef(null);

  // Maneja la selección de un lugar con autocompletado
  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setCoordinates({ lat, lng });
    setDireccion({
      ...direccion,
      address_complete: place.formatted_address,
      valid: true,
      type: 'autocompleted',
    });

    // Desactiva el modo de selección manual si se selecciona una dirección con autocompletado
    setManualSelect(false);
  };

  // Maneja el clic en el mapa para la selección manual
  const handleMapClick = (e) => {
    if (!manualSelect) return;

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinates({ lat, lng });

    setDireccion({
      ...direccion,
      type: 'manual',
      valid: !!direccion.address_complete,
    });
  };

  // Actualiza la validez de la dirección cuando cambie el campo address_complete
  useEffect(() => {
    setDireccion({ ...direccion, valid: false });
  }, [direccion.address_complete]);

  // Maneja el arrastre del marcador
  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <div>
      {/* <LoadScript googleMapsApiKey={ENV.VITE_KEYMAPS} libraries={libraries}> */}
      {/* Campo de autocompletado de dirección */}
      <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={onPlaceChanged}>
        <FormField
          id="direccion"
          label="Dirección"
          type="text"
          icon={<BsFillGeoAltFill />}
          placeholder="Escribe la dirección..."
          helpText="Escribe tu dirección para que podamos ubicarte mejor y selecciona una opción de la lista. Si no encuentras tu dirección, puedes seleccionarla manualmente mas abajo."
          value={direccion.address_complete}
          onChange={(e) => setDireccion({ ...direccion, address_complete: e.target.value })}
        />
      </Autocomplete>

      {/* Campo de piso */}
      <FormField
        id="piso"
        label="Piso"
        type="text"
        required={false}
        icon={<BiLogoGoogle />}
        placeholder="Escribe tu piso de la casa..."
        value={direccion.piso}
        helpText="Escribe el piso de tu casa para ser mas facil la entrega. Lo puedes omitir :)"
        onChange={(e) => setDireccion({ ...direccion, piso: e.target.value })}
      />

      {/* Instrucciones y botón de selección manual */}
      <Row className="mb-3">
        <Col xs={12} md={8}>
          <p>
            <strong>Instrucciones:</strong> Si no encuentras la dirección exacta usando el
            autocompletado, puedes activar la <strong>selección manual</strong> para escoger
            una ubicación directamente en el mapa. Arrastra el marcador para ajustarlo
            según tus necesidades.
          </p>
        </Col>
        <Col xs={12} md={4}>
          <Button
            variant={manualSelect ? "danger" : "primary"}
            onClick={() => setManualSelect(!manualSelect)}
            className="w-100"
          >
            {manualSelect ? "Desactivar selección manual" : "Seleccionar manualmente"}
          </Button>
        </Col>
      </Row>

      {/* Mapa con marcador */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={coordinates}
        zoom={coordinates.lat ? 15 : 6}
        onClick={handleMapClick}
      >
        {coordinates.lat && (
          <Marker
            position={coordinates}
            // si está activa la selección manual, permitir arrastrar el marcador
            draggable={manualSelect}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
      {/* </LoadScript> */}
    </div>
  );
};

export default MapComponent;
