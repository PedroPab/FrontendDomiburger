import { Button } from 'react-bootstrap';
import InputCodigoText from '../../Codigos/CrearCodigoReferido/InputCodigoText';
import { useContext, useState } from 'react';
import { findCodigo } from '../../../Utils/api/codigos/findCodigo';
import { MiContexto } from '../../../Context';
import { toast } from 'react-toastify';
import CodeCard from '../../Codigos/CodeCard';

const InputCodigo = ({ dataCode, setDataCode, agregarCodigo, retirarCodigo }) => {
  const context = useContext(MiContexto)
  const token = context.tokenLogin.token

  const [code, setCode] = useState('');

  // const agregarCodigo = () => {
  //   toast.success('...Simulando Codigo agregado');
  //   agregarCodigo
  // }

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
      return (<Button variant="success" onClick={() => agregarCodigo(dataCode)}>Agregar</Button>)
    }
    return (<Button variant="primary" onClick={buscarCodigo}>Buscar</Button>)
  }
  const eliminarCodigo = () => {
    //si llegarmos a tener una lista de codigos se eliminaria de la lista
    setDataCode(null)
  }
  const eliminarProducto = (code) => {
    retirarCodigo(code)
  }
  return (
    <>
      <InputCodigoText
        codigo={code}
        setCodigo={setCode}
        ButtonComponent={<ButtonActionCode />}
      />
      {/* mostramos los datos de codigo  */}
      {/* {dataCode && <AlertInfoRedCodigo dataCodigo={dataCode} />} */}
      {dataCode &&
        <CodeCard
          deleteCode={eliminarCodigo}
          addProducts={agregarCodigo}
          deleteProducts={eliminarProducto}
          code={dataCode}
        />}
    </>
  );
};

export default InputCodigo;
