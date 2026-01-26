import { useState } from "react";
import { ClientsService } from "../../../apis/clientV2/ClientsService";
import { useAuth } from "../../../Context/AuthContext";

const useClientUpdate = () => {

  const { token } = useAuth()
  const orderService = new ClientsService(token);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);


  const updateClient = async (id, data) => {
    setLoading(true);
    try {
      const response = await orderService.update(id, data);
      setData(response.body);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    return data;
  }
  return {
    error: error,
    data: data,
    loading: loading,
    updateClient
  }
}

export { useClientUpdate }