import { ESTADOS } from "./constList";

function filtrarPedidos(list) {
  const newArray = list.filter(pedido => {
    if (pedido.estado == ESTADOS.Facturados) return false;
    if (pedido.estado == ESTADOS.Eliminados) return false;
    if (pedido.estado == ESTADOS.PendieteTransferencia && pedido.pagoConfirmado.confirmado) return false;
    return true;
  });

  return newArray;
}
export { filtrarPedidos }