import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BuscadorCliente from '../../components/Codigos/CrearCodigoReferido/BuscadorCliente';
import NameInput from '../../components/FormsInputs/NameInput';
import MyMapWithAutocomplete from '../../components/MyMapWithAutocomplete';
const ENV = import.meta.env

const FormContainerAdmin = ({ token, userId }) => {
  const [telefono, setTelefono] = useState('');
  const [name, setName] = useState('');
  const [direccion, setDireccion] = useState({});

  const [codigo, setCodigo] = useState('');
  const [valid, setValid] = useState(false);

  const [dataCliente, setDataCliente] = useState(null);
  useEffect(() => {
    if (!dataCliente) {
      setValid(false)
      return
    }
    if (dataCliente.name) {
      setName(dataCliente.name)
    }
  }, [dataCliente])

  return (
    <Container>
      {/* Aquí va el contenido del formulario */}

      <BuscadorCliente
        telefono={telefono}
        setTelefono={setTelefono}
        dataCliente={dataCliente}
        setDataCliente={setDataCliente}
        token={token}
        visibleDataClient={false}
      />

      <NameInput
        name={name}
        setName={setName}
      />


      <MyMapWithAutocomplete
        objAdrees={direccion}
        setObjAdrees={setDireccion}
        VITE_KEYMAPS={ENV.VITE_KEYMAPS}
      />


    </Container>
  )
}

export default FormContainerAdmin;
