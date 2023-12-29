import { useState, } from 'react';
import { GoogleMap, Autocomplete, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const mapContainerStyle = {
  height: "12rem",
};

const libraries = ["places", "geometry"];

const MyMapWithAutocomplete = ({ objAdrees, setObjAdrees, VITE_KEYMAPS }) => {
  const centerOrigin = { lat: 6.3017314, lng: -75.5743796 }


  const getDistanceMatrix = async (destino) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      const service = new google.maps.DistanceMatrixService();
      // eslint-disable-next-line no-undef
      var modoTransporte = google.maps.TravelMode.TWO_WHEELER;

      service.getDistanceMatrix(
        {
          origins: [centerOrigin], // Reemplaza con tu origen
          destinations: [destino], // Reemplaza con tu destino
          travelMode: modoTransporte,
          // eslint-disable-next-line no-undef
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
          durationInTraffic: true, // Incluir tráfico en el cálculo
        },
        (response, status) => {
          if (status === 'OK') {
            const result = response.rows[0].elements[0];
            resolve(result)
          } else {
            console.error('Error con la API de Distance Matrix: ' + status);
            reject('Error con la API de Distance Matrix: ' + status);
          }
        }
      );
    })

  };



  const [center, setCenter] = useState(centerOrigin)


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_KEYMAPS,
    libraries,

  });

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    console.log('autocomplete: ', autocompleteInstance);
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = async () => {
    console.log('un cambio en el input');
    if (autocomplete !== null) {

      const place = autocomplete.getPlace()

      console.log(place);

      if (!place?.geometry) {
        console.log(autocomplete.geometry)
        return
      }

      const coordenadasInput = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }

      setCenter(coordenadasInput)

      const address_complete = place.formatted_address
      const type = 'placesAutocomplete'
      const valid = true
      // let cost
      // let durationAprox
      let dataMatrix = await getDistanceMatrix(coordenadasInput);
      console.log("🚀 ~ file: index.jsx:92 ~ onPlaceChanged ~ dataMatrix:", dataMatrix)

      setObjAdrees({ ...objAdrees, address_complete, type, valid, dataMatrix, coordinates: coordenadasInput })

      //calculamos las metricas


    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onChange = (event) => {
    const nesValue = event.target.value
    setObjAdrees({ ...objAdrees, direccionIput: nesValue, valid: false })
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        bounds={{
          north: centerOrigin.lat + .5,
          south: centerOrigin.lat - .5,
          east: centerOrigin.lng + .5,
          west: centerOrigin.lng - .5,
        }}

      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor={'hol'}>Direccion Completa</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <BsFillGeoAltFill />
            </InputGroup.Text>
            <FormControl
              id={'adress'}
              required
              type={'text'}
              placeholder={'Calle 103 # 74b 214'}
              // value={objAdrees?.direccionIput || ''}
              onChange={onChange}
              autoComplete
            />
            {/* {feedback && <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>} */}
          </InputGroup>
        </Form.Group>

      </Autocomplete>
      {
        autocomplete &&
        objAdrees?.valid &&
        < GoogleMap
          id="searchbox-example"
          mapContainerStyle={mapContainerStyle}
          zoom={16}
          center={center}
          options={{
            disableDefaultUI: true, // Desactiva todos los controles de la interfaz de usuario predeterminada
            zoomControl: false, // Desactiva el control de zoom
            draggable: false, // Hace que el mapa no sea arrastrable
            scrollwheel: false, // Desactiva el zoom con la rueda del ratón
            restriction: {
              latLngBounds: {
                north: centerOrigin.lat + .5,
                south: centerOrigin.lat - .5,
                east: centerOrigin.lng + .5,
                west: centerOrigin.lng - .5,
              }, //area de busqueda
              strictBounds: true,

            }
          }}
        >
          <Marker
            position={center}
            visible={true}
          /> &&
          <InfoWindow
            position={center}
            visible={true}
          >
            <div style={{ color: 'black' }}>
              Estoy aqui?
            </div>
          </InfoWindow>
        </ GoogleMap>
      }

    </>

  );
};

export default MyMapWithAutocomplete;
