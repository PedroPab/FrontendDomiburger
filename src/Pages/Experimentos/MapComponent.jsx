import { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import FormField from "../../components/FormField";
import { BiLogoGoogle } from "react-icons/bi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";

const ENV = import.meta.env;

const libraries = ["places"]; // Añadimos 'places' para habilitar el Autocomplete de Google

const MapComponent = ({ coordinates, setCoordinates, stateDireccion }) => {
  const [direccion, setDireccion] = stateDireccion
  // const [coordinates, setCoordinates] = useState({ lat: 10, lng: -84 });
  const [manualSelect, setManualSelect] = useState(false);
  const autocompleteRef = useRef(null);

  // Esta función se activa cuando el usuario selecciona una opción de autocompletado
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
      setDireccion({
        ...direccion,
        address_complete: place.formatted_address,
        valid: true,
        type: 'autocompleted',

      });
    }
  };

  const handleMapClick = (e) => {
    if (manualSelect) {
      setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      if (!direccion.address_complete || direccion.address_complete === '') {
        setDireccion({
          ...direccion,
          type: 'manual',
          valid: false
        });
      } else {
        setDireccion({
          ...direccion,
          type: 'manual',
          valid: true
        });
      }
    }
  };

  useEffect(() => {
    if (direccion.address_complete === '') {
      setDireccion({ ...direccion, valid: false });
    }
  }, [direccion.address_complete])

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={ENV.VITE_KEYMAPS} libraries={libraries}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <FormField
            id="direccion"
            label="Dirección"
            type="text"
            icon={<BsFillGeoAltFill />}
            placeholder="Escribe la dirección..."
            value={direccion.address_complete}
            onChange={(e) => setDireccion({ ...direccion, address_complete: e.target.value })}
          />

        </Autocomplete>
        <FormField
          id="iso"
          label="Piso"
          type="text"
          icon={<BiLogoGoogle />}
          placeholder="Escribe tu piso de la casa..."
          value={direccion.piso}
          onChange={(e) => setDireccion({ ...direccion, piso: e.target.value })}
        />
        {/* Usamos una fila y columnas para organizar el texto y el botón */}
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

        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={coordinates}
          zoom={coordinates.lat ? 15 : 6}
          onClick={handleMapClick}
        >
          {coordinates.lat && (
            <Marker
              key={1}
              position={coordinates}
              draggable={true} // Permite que el marcador sea arrastrado
              onDragEnd={handleMarkerDragEnd} // Actualiza las coordenadas cuando se arrastra el marcador
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div >
  );
};

export default MapComponent;
