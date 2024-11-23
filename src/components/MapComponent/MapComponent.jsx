import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import FormField from "../FormField";
import { BiLogoGoogle } from "react-icons/bi";
import { BsFillGeoAltFill } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";

const MapComponent = ({ center, stateCoordenadas, stateDireccion }) => {

  const [coordinates, setCoordinates] = stateCoordenadas;
  const [direccion, setDireccion] = stateDireccion;
  const [manualSelect, setManualSelect] = useState(false);
  const autocompleteRef = useRef(null);

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

    setManualSelect(false);
  };

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

  useEffect(() => {
    setDireccion({ ...direccion, valid: false });
  }, [direccion.address_complete]);

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        bounds={{
          north: center.lat + 1.5,
          south: center.lat - 1.5,
          east: center.lng + 1.5,
          west: center.lng - 1.5,
        }}
        fields={["geometry", "name", "formatted_address", "address_components", "types"]}
        options={{
          componentRestrictions: { country: ["CO"] },
          strictBounds: true,
        }}
        onPlaceChanged={onPlaceChanged}
      >
        <FormField
          id="direccion"
          label="Dirección"
          type="text"
          icon={<BsFillGeoAltFill />}
          placeholder="Ejemplo: Calle 103d # 76 12"
          value={direccion.address_complete}
          onChange={(e) => setDireccion({ ...direccion, address_complete: e.target.value })}
        />
      </Autocomplete>

      <FormField
        id="piso"
        label="Piso y comentarios"
        type="text"
        required={false}
        disabled={true}
        icon={<BiLogoGoogle />}
        placeholder="Ejemplo: Piso 2, puerta de la izquierda / Apt 301 frente al colegio"
        value={direccion.piso}
        onChange={(e) => setDireccion({ ...direccion, piso: e.target.value })}
      />

      <Row className="mb-3">
        <Col xs={12} md={8}>
          <p>
            <strong>Instrucciones:</strong> Si tienes problemas con la dirección, selecciónala en el mapa.
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
        center={coordinates.lat ? coordinates : center}
        zoom={14}
        onClick={handleMapClick}
        options={{
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_LEFT,
            mapTypeIds: ["roadmap", "terrain"],
          },
          streetViewControl: false, // Desactiva el control de Street View
          restriction: {
            latLngBounds: {
              north: center.lat + 0.5,
              south: center.lat - 0.5,
              east: center.lng + 0.5,
              west: center.lng - 1,
            },
            strictBounds: false,
          },
        }}
      >
        {coordinates.lat && (
          <Marker
            position={coordinates}
            draggable={manualSelect}
            onDragEnd={handleMarkerDragEnd}
            label={":)"}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
