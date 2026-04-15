import { useState, useMemo, useCallback } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { OrderService } from "../../../apis/clientV2/OrderService";

const useOrderFindHistoryByCourier = () => {
  const { token } = useAuth();
  const service = useMemo(() => new OrderService(token), [token]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchOrders = useCallback(async ({ startDate, endDate, id }) => {
    setLoading(true);
    try {
      const response = await service.getOrderByCourier({
        startDate,
        endDate,
        id
      });
      setData(response);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [service]);

  return {
    error,
    data,
    loading,
    fetchOrders
  };
}

export { useOrderFindHistoryByCourier }