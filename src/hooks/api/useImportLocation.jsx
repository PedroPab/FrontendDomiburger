import { useMemo, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { ClientsService } from "../../apis/clientV2/ClientsService";

const useImportLocation = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const clientsService = useMemo(() => new ClientsService(token), [token]);

  const importLocation = async (idClient) => {
    setLoading(true);
    try {
      const rta = await clientsService.importLocation(idClient);
      setData(rta);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { importLocation, loading, error, data };
}

export { useImportLocation };