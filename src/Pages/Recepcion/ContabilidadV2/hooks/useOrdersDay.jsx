import { useState, useMemo, useCallback } from "react";
import { OrderService } from "../../../../apis/clientV2/OrderService";
import { useAuth } from "../../../../Context/AuthContext";
import { useMiContexto } from "../../../../Context";

const useOrdersDay = () => {
  const { token } = useAuth();
  const orderService = useMemo(() => new OrderService(token), [token]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  const { kitchenSelectId: kitchenId } = useMiContexto();

  const fetchOrders = useCallback(async (startDate, endDate) => {
    setLoading(true);
    try {
      const response = await orderService.getOrdersDay({ kitchenId, startDate, endDate });
      setOrdenes(response);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [orderService, kitchenId]);

  return {
    error,
    data: ordenes,
    loading,
    fetchOrders
  };
}

export { useOrdersDay }