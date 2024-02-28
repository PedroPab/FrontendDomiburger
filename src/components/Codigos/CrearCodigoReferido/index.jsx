import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import BuscadorCliente from './BuscadorCliente';
import { createCodeReferidos } from '../../../Utils/api/codigos/createCodeReferidos';

const CrearCodigoReferido = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('+573056249956');
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
    //enviamos la data al backend
    const code = await createCodeReferidos(data, token)
    ///si todo fue un éxito , mostramos en la pantalla un mensaje y borramos el formulario , si no mostramos el error

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
    </div>
  );
};

export default CrearCodigoReferido