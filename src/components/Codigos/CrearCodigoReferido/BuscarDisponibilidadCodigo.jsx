import { Button } from "react-bootstrap"
import { findCodigo } from "../../../Utils/api/codigos/findCodigo"

const BuscarDisponibilidadCodigo = ({
  setCodigo,
  codigo,
  token,
}) => {

  const buscarCodigo = async () => {
    const dataCodigo = await findCodigo(codigo, token)
    if (!dataCodigo) {
      //como 
      setCodigo({ isValid: true, })
    }
    setCodigo({ isValid: false, })
  }
  return (
    <>
      <label htmlFor="codigo">Código:</label>
      <input
        type="text"
        id="codigo"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <Button variant="primary"
        onClick={() => buscarCodigo()}
      >Buscar Codigo</Button >
      <hr />
      <br />
      {
        codigo ?
          <div>datos del Codigo: {codigo}</div> :
          <div> no hay codigo</div>
      }
      <hr />

    </>

  )
}

export default BuscarDisponibilidadCodigo