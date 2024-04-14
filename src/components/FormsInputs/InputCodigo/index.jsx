import { Button, Form } from 'react-bootstrap';
import InputCodigoText from '../../Codigos/CrearCodigoReferido/InputCodigoText';
import { useContext, useState } from 'react';
import { findCodigo } from '../../../Utils/api/codigos/findCodigo';
import { MiContexto } from '../../../Context';
import { toast } from 'react-toastify';
import AlertInfoRedCodigo from '../../Codigos/AlertInfoRedCodigo';

const InputCodigo = ({ dataCode, setDataCode }) => {
  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  const [code, setCode] = useState('hola');

  const agregarCodigo = () => {
    toast.success('...Simulando Codigo agregado');
  }

  const buscarCodigo = () => {
    findCodigo(code, token)
      .then((res) => {
        toast.success('Codigo encontrado');
        setDataCode(res.body)
        setCode('')
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.body);
      });
  }

  const ButtonActionCode = () => {
    if (dataCode) {
      return (<Button variant="success" onClick={agregarCodigo}>Agregar</Button>)
    }
    return (<Button variant="primary" onClick={buscarCodigo}>Buscar</Button>)
  }

  return (
    <>
      <InputCodigoText
        codigo={code}
        setCodigo={setCode}
        ButtonComponent={<ButtonActionCode />}
      />
      {/* mostramos los datos de codigo  */}
      {dataCode && <AlertInfoRedCodigo dataCodigo={dataCode} />}
    </>
  );
};

export default InputCodigo;
