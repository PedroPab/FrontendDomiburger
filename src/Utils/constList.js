
const ESTADOS = {
  PendienteConfimacion: 'PendienteConfimacion',
  Calientes: 'Calientes',
  Preparando: 'Preparando',
  Espera: 'Espera',
  Despachados: 'Despachados',
  Entregados: 'Entregados',
  Facturados: 'Facturados',
  Eliminados: 'Eliminados',
  PendieteTransferencia: 'PendieteTransferencia',
  Indefinido: "Indefinido",
}

const COLLECTIONS = {
  Clientes: 'Clientes',
  Pedidos: 'Pedidos',
  Productos: 'Productos',
  domiciliarios: 'domiciliarios',
  parametrosYconfiguracion: 'parametrosYconfiguracion',
  users: 'users',
  pendienteConfirmacion: 'ConfirmarPedido',
  idsPendienteConfirmacion: `idsPendienteConfirmacion`,
}

const ROLES = {
  admin: 'admin',
  cliente: 'cliente',
  domiciliario: 'domiciliario',
  recepcion: 'recepcion',
  cocinero: 'cocinero'
}

const FORMA_DE_PAGO = {
  Transferencia: 'Transferencia',
  Efectivo: 'Efectivo',
  Nequi: 'Nequi',
  Bancolombia: 'Bancolombia',
  PayPal: 'PayPal',
}

const PRODUCTS = {
  Hamburguesa: 'Hamburguesa',
  Combo: 'Combo',
}

export { COLLECTIONS, ESTADOS, ROLES, FORMA_DE_PAGO, PRODUCTS }