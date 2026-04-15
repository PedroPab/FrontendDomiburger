import { useState, useMemo, useCallback } from "react";
import { OrderService } from "../../../apis/clientV2/OrderService";
import { useAuth } from "../../../Context/AuthContext";

const useDeleteOrder = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const orderService = useMemo(() => new OrderService(token), [token]);

  const deleteOrder = useCallback(async (id) => {
    setLoading(true);
    try {
      const rta = await orderService.delete(id);
      setData(rta);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [orderService]);

  return { deleteOrder, loading, error, data };
}

export { useDeleteOrder };