import { Marker } from "@react-google-maps/api";
import { iconMarker } from "./iconMarker";
import { useWorker } from "../../Context/WorkerContext";
import { LocationsService } from "../../apis/clientV2/LocationsService";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";

const ListMarker = ({ pedidos }) => {
  const { setIdOrderSelect } = useWorker();
  const { token } = useAuth();
  const locationService = new LocationsService(token);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const resolvedLocations = await Promise.all(
        pedidos.map(async (order) => {
          const location = await locationService.getById(order.locationId);
          return { ...order, location: location.body };
        })
      );
      setLocations(resolvedLocations);
    };

    fetchLocations();
  }, [pedidos]);

  return (
    <>
      {locations.map((order, index) => (
        <Marker
          key={index}
          position={order.location.coordinates}
          title="Pedido"
          animation="DROP"
          label={`${order?.dailyOrderNumber}`}
          clickable={true}
          icon={iconMarker(order?.status)}
          visible={true}
          onClick={() => {
            setIdOrderSelect(order?.id);
          }}
        />
      ))}
    </>
  );
};

export default ListMarker;
