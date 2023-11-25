import { listaEstados } from "./listEstados"


const extraerColorEstado = (estado) => {
  const indexEstado = listaEstados.findIndex(e => e.name == estado)
  const objEstado = listaEstados[indexEstado]

  const colorEstado = objEstado?.color
  return colorEstado
}

export default extraerColorEstado