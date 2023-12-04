import { useRef } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const PlaceAutocomplete = ({ KEY, InputAdress, placeChanged }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: KEY, // Reemplaza con tu API key
    libraries,
  });

  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    // console.log(`place`, place); // Aquí puedes manejar el lugar seleccionado como necesites
    placeChanged(place)
  };

  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceChanged}
    >
      {/* <input
        type="text"
        placeholder="Buscar lugar"
        className="autocomplete-input"
      /> */}
      <InputAdress />
    </Autocomplete>
  );
};

export default PlaceAutocomplete;
