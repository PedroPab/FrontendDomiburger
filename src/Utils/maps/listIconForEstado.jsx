import { ESTADOS } from '../constList.js'

const listIconForEstado = {}
listIconForEstado[ESTADOS.PendienteConfimacion] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=ff0008&format=png'
listIconForEstado[ESTADOS.Calientes] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=ffa500&format=png'
listIconForEstado[ESTADOS.Preparando] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=ffff00&format=png'
listIconForEstado[ESTADOS.Espera] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=008000&format=png'
listIconForEstado[ESTADOS.Despachados] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=0000ff&format=png'
listIconForEstado[ESTADOS.Entregados] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=4b0082&format=png'
listIconForEstado[ESTADOS.Facturados] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=ee82ee&format=png'
listIconForEstado[ESTADOS.Eliminados] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=000000&format=png'
listIconForEstado[ESTADOS.PendieteTransferencia] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=00ced1&format=png'
listIconForEstado[ESTADOS.Indefinido] = 'https://ui-avatars.com/api/?name=&size=150&rounded=true&background=8b4513&format=png'

export { listIconForEstado }