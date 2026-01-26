 
// import Pedido from "./Pedido"



class Lapso {
  /**
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Date} props.timeInit - La lista de pedidos del día.
 * @param {Date} props.timeFinality - La lista de pedidos del día.
 * @param {Pedido[]} props.pedidos - La lista de pedidos del día.
 */
  constructor({
    timeInit,
    timeFinality,
    pedidos = [],
  }) {
    this.timeInit = timeInit
    this.timeFinality = timeFinality
    this.pedidos = pedidos
    this.timeText = timeFinality.toLocaleTimeString()
  }
  /**
   * @param {Pedido} pedido
   * @memberof Lapso
   */
  addPedido(pedido) {
    this.pedidos.push(pedido)
  }
}

export {
  Lapso
}