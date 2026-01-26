import { useState } from "react";
import { ClientsService } from "../../../apis/clientV2/ClientsService";
import { useAuth } from "../../../Context/AuthContext";

const useClientFindById = () => {

  const { token } = useAuth()
  const orderService = new ClientsService(token);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);


  const fetchClient = async (id) => {
    setLoading(true);
    try {
      const response = await orderService.getById(id);
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
    fetchClient
  }
}

export { useClientFindById }