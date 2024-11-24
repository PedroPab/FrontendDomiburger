
import { useEffect } from 'react';

const useClienteData = (dataCliente, setName, setCoordinates, setInputDataDireccion, setTelefono) => {
  useEffect(() => {
    const { name, address, phone } = dataCliente || {};

    if (name) {
      setName(name);
    }

    if (address) {
      const { address_complete, coordinates } = address;
      setCoordinates(coordinates);
      setInputDataDireccion((prev) => ({
        ...prev,
        address_complete,
        valid: true,
        type: 'autocompleted',
      }));
    }

    if (phone) {
      setTelefono(phone);
    }
  }, [dataCliente, setName, setCoordinates, setInputDataDireccion, setTelefono]);
};

export default useClienteData;