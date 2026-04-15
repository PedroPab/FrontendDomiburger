import { Marker } from "@react-google-maps/api";
import { iconMarker } from "./iconMarker";
import { useWorker } from "../../Context/WorkerContext";
import { useCache } from "../../Context/CacheContext";
import { useEffect, useState, useCallback } from "react";

const ListMarker = ({ pedidos }) => {
  const { setIdOrderSelect } = useWorker();
  const { getLocationsByIds } = useCache();

  const [locations, setLocations] = useState([]);

  const fetchLocations = useCallback(async () => {
    if (!pedidos || pedidos.length === 0) {
      setLocations([]);
      return;
    }

    const locationIds = pedidos.map(order => order.locationId);
    const fetchedLocations = await getLocationsByIds(locationIds);

    const resolvedLocations = pedidos.map((order, index) => ({
      ...order,
      location: fetchedLocations[index]
    }));
    setLocations(resolvedLocations);
  }, [pedidos, getLocationsByIds]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

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
