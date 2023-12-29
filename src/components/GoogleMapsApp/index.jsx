// App.js o cualquier otro componente padre
import { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import AutocompleteComponent from './AutocompleteComponent';
import MapComponent from './MapComponent.jsx';
const ENV = import.meta.env

const App = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const libraries = ['autoplace']
  const { isLoaded } = useLoadScript({
    id: 'google-map-script-domiburguer',
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries,
  });

  const handlePlaceSelect = (place) => {
    setSelectedPlace({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };



  if (!isLoaded) return <div>Cargando...</div>;


  return (
    <div>
      <InputAdress
        direccion={direccion}
        setDireccion={setDireccion}
        input={Direccion}
      />

      <AutocompleteComponent onPlaceSelected={handlePlaceSelect} />
      {selectedPlace && <MapComponent location={selectedPlace} />}
    </div>
  );
};

export default App;
