import { Marker } from "@react-google-maps/api";


const iconKitchen = {
  path: "m -0.55 -29.9954 c -8.4296 0 -18.2734 5.1562 -18.2734 18.2734 c 0 8.8984 14.0546 28.5704 18.2734 33.7266 c 3.75 -5.1562 18.2734 -24.3594 18.2734 -33.7266 c 0 -13.1172 -9.8438 -18.2734 -18.2734 -18.2734 z m 0 0",
  fillColor: "#abff10", // Color de relleno del icono
  fillOpacity: 1, // Opacidad del relleno
  strokeColor: "#000000", // Color del borde del icono
  strokeWeight: 1, // Grosor del borde
  scale: 1, // Escala del icono
};

const MarkerKitchen = ({ kitchen }) => {
  const origin = kitchen?.location?.coordinates;
  if (!origin) return null;
  return (
    <Marker
      position={origin}
      title={kitchen?.name}
      animation="DROP"
      label={`${kitchen?.name}`}
      clickable={true}
      icon={iconKitchen}
      visible={true}
      // onClick={() => {
      // setIdOrderSelect(order?.id);
      // }}
    />
  );
}

export { MarkerKitchen };