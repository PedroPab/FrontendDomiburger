import { useState, } from 'react';
import { GoogleMap, Autocomplete, useLoadScript } from '@react-google-maps/api';
import FormField from '../FormField';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
const ENV = import.meta.env
const mapContainerStyle = {
  height: "400px",
  width: "800px"
};

const center = {
  lat: 38.685,
  lng: -115.234
};
const libraries = ['places',];

const MyMapWithAutocomplete = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.VITE_KEYMAPS,
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
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  const Direccion = () => {
    return (<FormField
      id="adressInput"
      label="Dirección"
      type="text"
      placeholder="Dirección"
      // value={direccion?.address_complete}
      // onChange={(e) => setDireccion(e.target.value)}
      icon={<BsFillGeoAltFill />}
      feedback="Por favor ingrese una dirección válida."
      feedbackType="invalid"
    />)
  }
  return (
    <>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor={'hol'}>direcicon</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              h
            </InputGroup.Text>
            <FormControl
              id={'hol'}
              required
              type={'text'}
            // placeholder={placeholder}
            // value={value}
            // onChange={onChange}
            />
            {/* {feedback && <Form.Control.Feedback type={feedbackType}>{feedback}</Form.Control.Feedback>} */}
          </InputGroup>
        </Form.Group>

      </Autocomplete>
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={mapContainerStyle}
        zoom={2.5}
        center={center}
      >

      </GoogleMap>
    </>

  );
};

export default MyMapWithAutocomplete;
