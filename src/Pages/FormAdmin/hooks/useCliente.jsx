import { useState, useEffect } from 'react';

export const useCliente = (dataCliente, setData) => {
  const [telefono, setTelefono] = useState('');
  const [name, setName] = useState('');
  const [dataAdrees, setDataAdrees] = useState({});

  useEffect(() => {
    const { name, address, phone } = dataCliente || {};

    if (name) {
      setName(name);
      setData(prevData => ({ ...prevData, name }));
    }

    if (address) {
      const { address_complete, coordinates } = address;
      const newDireccion = {
        address_complete,
        direccionInput: address_complete,
        coordinates
      };
      setDataAdrees(newDireccion);
    }

    if (phone) {
      setTelefono(phone);
      setData(prevData => ({ ...prevData, phone }));
    }
  }, [dataCliente, setData]);

  return { telefono, setTelefono, name, setName, dataAdrees };
};
