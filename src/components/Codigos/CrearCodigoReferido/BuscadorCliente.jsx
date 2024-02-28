import { Button } from "react-bootstrap"
import { findClientForPhone } from "../../../Utils/api/findClient"

const BuscadorCliente = ({
  telefono,
  setTelefono,
  token,
  dataCliente,
  setDataCliente
}) => {

  const buscarCliente = async () => {
    const dataClient = await findClientForPhone(telefono, token)
    if (!dataClient) {
      setDataCliente(null)
    }
    //buscamos la cantidad de pedidos asociados al cliente
    // const orders = await findOrdersForClient(dataClient.id)
    // dataClient.orders = orders
    setDataCliente(dataClient)
  }
  return (
    <>
      <h3>Buscar Cliente</h3>

      <label htmlFor="telefono">Teléfono:</label>
      <input
        type="tel"
        id="telefono"
        value={telefono}
        onChange={(e) => {
          let telefono = e.target.value
          //formateamos el numero para que no tenga nada raro , como espacios o caracteres especiales con expresiones regulares, solo ser permite los números y el signo +
          telefono = telefono.replace(/[^+0-9]/g, '')
          setTelefono(telefono)
        }}
      />
      <Button variant="primary"
        onClick={() => buscarCliente()}
      >Buscar Cliente</Button >
      <hr />
      {
        dataCliente ?
          <div>
            <p>Nombre: {dataCliente?.name}</p>
            <p>Teléfono: {dataCliente?.phone}</p>
            <p>Id cliente: {dataCliente?.id}</p>
            <p>Cantidad de pedidos: {dataCliente?.orders?.length}</p>
          </div>
          :
          <div>
            <p>Cliente no encontrado</p>
          </div >
      }
      <hr />

    </>

  )
}

export default BuscadorCliente