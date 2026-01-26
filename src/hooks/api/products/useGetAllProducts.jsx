import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { ProductsService } from "../../../apis/clientV2/ProductsService";

const useGetAllProducts = () => {
  const { token } = useAuth()
  const service = new ProductsService(token);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchProducts = async (locationId, kitchenId) => {
    setLoading(true);
    try {

      const response = await service.getAll(locationId, kitchenId);
      setData(response.body);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return {
    error: error,
    data: data,
    loading: loading,
    fetchProducts
  }
}

export { useGetAllProducts }