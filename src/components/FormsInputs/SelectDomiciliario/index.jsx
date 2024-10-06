import { useContext } from 'react';
import { RecepcionContexto } from '../../../Context/RecepcionContex';
import { MdDeliveryDining } from "react-icons/md";
import FormField from '../../FormField';

const SelectDomiciliario = ({ selectDomiciliario, setSelectDomiciliario }) => {
  const contextRecepcion = useContext(RecepcionContexto)
  const OpcionesDomiciliarios = () => {
    return (
      <>
        <option value="">Sin asignar</option>
        {contextRecepcion.listDomiciliarios.map(domiciliario => (
          <option
            key={domiciliario.id}
            value={domiciliario.id}>
            {domiciliario.name}
          </option>
        ))}
      </>
    )
  }

  const handleChange = (e) => {
    //solo debe permitir letras y espacios y números
    const rta = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '')
    setSelectDomiciliario(rta);
  };

  return <FormField
    as="select"
    id="formDomiciliario"
    label="Seleccionar domiciliario:"
    value={selectDomiciliario}
    onChange={handleChange}
    // helpText="para ahorrar tiempo, si ya sebes que domiciliario va a llevar el pedido."
    icon={<MdDeliveryDining />}
  >
    <OpcionesDomiciliarios />
  </FormField>
};

export default SelectDomiciliario;
