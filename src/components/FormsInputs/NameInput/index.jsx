import FormField from '../../FormField';
import { FaUser } from 'react-icons/fa';

const NameInput = ({ name, setName }) => {
  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setName(rta);
  };

  return (
    <FormField
      id="formNombre"
      label="Nombre"
      type="text"
      icon={<FaUser />}
      placeholder="Nombre Completo"
      value={name}
      onChange={handleChange}
      required
      helptext="Que bonito nombre ❤"
    />
  )
};

export default NameInput;
