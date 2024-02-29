import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BuscadorCliente from './BuscadorCliente';
import { createCodeReferidos } from '../../../Utils/api/codigos/createCodeReferidos';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearCodigoReferido = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('+573054489598');
  const [codigo, setCodigo] = useState('');
  const [valid, setValid] = useState(false);
  const [dataCliente, setDataCliente] = useState(null);

  useEffect(() => {
    if (dataCliente && codigo) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [dataCliente, codigo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    //sacamos la data del formulario
    const data = {
      id: codigo,
      userCreate: userId,
      clientId: dataCliente.id,
      phoneClient: dataCliente.phone,
    }

    try {
      //enviamos la data al backend
      await createCodeReferidos(data, token)
      ///si todo fue un éxito , mostramos en la pantalla un mensaje y borramos el formulario , si no mostramos el error
      toast(`todo fue un éxito `)
      setTelefono('');
      setCodigo('');
      setDataCliente(null);
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div>
      <h1>Crear Código de Referido</h1>
      <form onSubmit={handleSubmit}>
        <BuscadorCliente
          telefono={telefono}
          setTelefono={setTelefono}
          dataCliente={dataCliente}
          setDataCliente={setDataCliente}
          token={token}
        />
        <br />

        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          disabled={!valid}
          variant="primary"
        >Crear Código</Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearCodigoReferido