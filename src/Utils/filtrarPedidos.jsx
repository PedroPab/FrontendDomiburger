import { ESTADOS, ROLES } from "./constList";

function filtrarPedidos(list, role = null) {
  console.log("🚀 ~ file: filtrarPedidos.jsx:4 ~ filtrarPedidos ~ role:", role)

  const newArray = list.filter(pedido => {

    if (role == ROLES.cocinero) {
      //  solo acepatamos los pedidos de calietne y preparando 
      if (pedido.estado == ESTADOS.Calientes || pedido.estado == ESTADOS.Preparando) return true;
      return false

    }
    //para  los demas roles
    if (pedido.estado == ESTADOS.Facturados) return false;
    if (pedido.estado == ESTADOS.Eliminados) return false;
    if (pedido.estado == ESTADOS.PendieteTransferencia && pedido.pagoConfirmado.confirmado) return false;
    return true;

  });

  return newArray;
}
export { filtrarPedidos }