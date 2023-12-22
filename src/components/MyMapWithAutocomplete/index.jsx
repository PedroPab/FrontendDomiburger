import { memo, useState, } from 'react';
import { GoogleMap, Autocomplete, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { BsEgg, BsFillGeoAltFill } from 'react-icons/bs';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
const mapContainerStyle = {
  height: "12rem",
};

// const center = {
//   lat: 38.685,
//   lng: -115.234
// };
const libraries = ['places',];

const MyMapWithAutocomplete = ({ objAdrees, setObjAdrees, VITE_KEYMAPS }) => {

  const [center, setCenter] = useState({ lat: 6.3017314, lng: -75.5743796 })


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: VITE_KEYMAPS,
    libraries,

  });

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autocompleteInstance) => {
    console.log('autocomplete: ', autocompleteInstance);
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {

      console.log(autocomplete.getPlace());
      if (!autocomplete.getPlace()?.geometry) {
        console.log(autocomplete.geometry)
        return
      }

      const coordenadasInput = {
        lat: autocomplete.getPlace().geometry.location.lat(),
        lng: autocomplete.getPlace().geometry.location.lng()
      }

      setCenter(coordenadasInput)

      const address_complete = autocomplete.getPlace().formatted_address
      console.log("🚀 ~ file: index.jsx:50 ~ onPlaceChanged ~ address_complete:", address_complete)
      setObjAdrees({ ...objAdrees, address_complete })

    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onChange = (event) => {
    const nesValue = event.target.value
    setObjAdrees({ ...objAdrees, direccionIput: nesValue })
  }

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
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
            />
            {/* {feedback && <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>} */}
          </InputGroup>
        </Form.Group>

      </Autocomplete>

      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={{
          disableDefaultUI: true, // Desactiva todos los controles de la interfaz de usuario predeterminada
          zoomControl: false, // Desactiva el control de zoom
          draggable: false, // Hace que el mapa no sea arrastrable
          scrollwheel: false, // Desactiva el zoom con la rueda del ratón
        }}
      >

        <Marker
          key={1}
          position={center}
          title='title'
          animation='DROP'
        // label={`Estoy aqui?`}
        // clickable={true}
        // // icon={iconMarker}
        // visible={true}
        >
          {true && (
            <InfoWindow >
              <div style={{ color: 'black' }}>
                Estoy aqui?
              </div>
            </InfoWindow>
          )}
        </Marker>


      </GoogleMap>
    </>

  );
};

export default memo(MyMapWithAutocomplete);
