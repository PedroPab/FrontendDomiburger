import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { RecepcionContexto } from '../../../Context/RecepcionContex';

const SelectDomiciliario = ({ selectDomiciliario, setSelectDomiciliario }) => {
  const contextRecepcion = useContext(RecepcionContexto)
  const OpcionesDomiciliarios = () => {
    return (
      <>
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

  return (
    <div className='m-3'>
      <Form.Group controlId="formCodigo">
        <Form.Label>Seleccionar domiciliario:</Form.Label>
        <Form.Control
          as="select"
          value={selectDomiciliario}
          onChange={handleChange}
        >
          <OpcionesDomiciliarios />
        </Form.Control>
        <Form.Text id="codigoHelpBlock" muted>
          para ahorrar tiempo, si ya sebes que domiciliario lo va a llevar.
        </Form.Text>
      </Form.Group>
    </div>
  );
};

export default SelectDomiciliario;
