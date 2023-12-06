import { useJsApiLoader } from '@react-google-maps/api';
const ENV = import.meta.env

const GoogleMapsApp = ({ children }) => {
  const libraries = ['places',];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-domiburguer',
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries,
  });

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <>
      {children}
    </>
  );
};

export default GoogleMapsApp;
