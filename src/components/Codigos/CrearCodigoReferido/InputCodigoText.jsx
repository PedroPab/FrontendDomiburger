import FormField from '../../FormField';
import { IoTicketSharp } from "react-icons/io5";

const InputCodigoText = ({ codigo, setCodigo, ButtonComponent }) => {
  const handleChange = (e) => {
    // Quitamos los espacios con expresiones regulares y todo lo que no sea alfanumérico
    const rta = e.target.value.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
    setCodigo(rta);
  };

  return (
    <FormField
      id="formCodigo"
      label="Código"
      type="text"
      placeholder="Introduce el código"
      value={codigo}
      onChange={handleChange}
      icon={<IoTicketSharp />}
      helpText="Introduce el código sin espacios."
      agregado2={ButtonComponent}
    >
    </FormField>
  )
};

export default InputCodigoText;
