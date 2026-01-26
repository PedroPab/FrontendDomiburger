import { useEffect, useState } from "react";

const useCalculateDataDelivery = (ordenes) => {
  const [priceDeliveryTotal, setPriceDeliveryTotal] = useState(0);
  const [distanceTotal, setDistanceTotal] = useState(0);

  useEffect(() => {
    if (!ordenes || ordenes.length === 0) {
      setPriceDeliveryTotal(0); // Asegurarse de reiniciar el total si no hay órdenes
      setDistanceTotal(0); // Asegurarse de reiniciar la distancia si no hay órdenes
      return;
    }
    // Calculamos el total de los domicilios de manera segura
    setPriceDeliveryTotal(ordenes.reduce((total, order) => total + (order.delivery?.price || 0), 0));
    //calculamos sla distancia
    setDistanceTotal(ordenes.reduce((total, order) => total + (order.delivery?.distance || 0), 0));

  }, [ordenes]);

  return {
    priceDeliveryTotal,
    distanceTotal,
    countDelivery: ordenes?.length || 0,
  }
}

export { useCalculateDataDelivery }