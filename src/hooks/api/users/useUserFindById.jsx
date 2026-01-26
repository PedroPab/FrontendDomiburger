
import { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { UsersService } from "../../../apis/clientV2/usersService";

const useUserFindById = () => {

  const { token } = useAuth()
  const service = new UsersService(token);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);


  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const response = await service.getByIdUser(id);
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
    fetchUser
  }
}

export { useUserFindById }