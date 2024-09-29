import { useEffect, useRef, useCallback } from 'react';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const mapContainerStyle = {
  height: '12rem',
};

const MyMapWithAutocomplete = ({ objAddress, setObjAddress }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Inicializar el mapa
  useEffect(() => {
    if (objAddress.valid && mapRef.current && !mapInstanceRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: objAddress.coordinates,
        zoom: 16,
        disableDefaultUI: true,
      });
      mapInstanceRef.current = map;

      // Añadir marcador
      const marker = new window.google.maps.Marker({
        position: objAddress.coordinates,
        map: map,
        draggable: true,
      });
      markerRef.current = marker;

      // Listener para mover el marcador
      marker.addListener('dragend', (event) => {
        const newCoordinates = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setObjAddress({
          ...objAddress,
          coordinates: newCoordinates,
        });
      });
    }
  }, [objAddress.valid, setObjAddress]);

  // Actualizar el centro del mapa y el marcador
  useEffect(() => {
    if (objAddress.valid && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(objAddress.coordinates);
      if (markerRef.current) {
        markerRef.current.setPosition(objAddress.coordinates);
      }
    }
  }, [objAddress.coordinates, objAddress.valid]);

  // Inicializar Autocomplete
  useEffect(() => {
    let autocomplete;
    if (autocompleteRef.current) {
      autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
        componentRestrictions: { country: 'CO' },
        fields: ['geometry', 'formatted_address'],
      });

      const handlePlaceChanged = () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          alert('No se encontró la ubicación. Por favor, selecciona una dirección válida.');
          return;
        }

        const { lat, lng } = place.geometry.location;
        const coordinates = { lat: lat(), lng: lng() };

        // Actualizar el estado con la dirección y las coordenadas
        setObjAddress({
          address_complete: place.formatted_address,
          coordinates: coordinates,
          valid: true,
          dataMatrix: place.geometry,
        });
      };

      autocomplete.addListener('place_changed', handlePlaceChanged);
    }

    // Limpieza al desmontar
    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [setObjAddress]);

  // Manejar cambios manuales en el input
  const onChange = useCallback(
    (event) => {
      const value = event.target.value;
      setObjAddress({ ...objAddress, address_complete: value, valid: false });
    },
    [objAddress, setObjAddress]
  );

  return (
    <div className="m-3">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="address">Dirección Completa</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <BsFillGeoAltFill />
          </InputGroup.Text>
          <FormControl
            id="address"
            required
            type="text"
            placeholder="Ingrese la dirección"
            value={objAddress?.address_complete || ''}
            onChange={onChange}
            ref={autocompleteRef}
            autoComplete="off"
          />
        </InputGroup>
      </Form.Group>

      <div ref={mapRef} style={mapContainerStyle} />
    </div>
  );
};

export default MyMapWithAutocomplete;
