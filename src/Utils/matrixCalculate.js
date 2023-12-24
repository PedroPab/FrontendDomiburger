const calcularPrecio = (distanceMtr) => {
  let prece = (Math.round((distanceMtr) / 1000) * 1000) + 1500
  const preceMin = 3500
  if (prece <= preceMin) {
    prece = preceMin
  } else if (prece < 5500) {
    prece = 5000
  }

  if (distanceMtr <= 100) {
    prece = 0
  }
  return prece

}
const calcularTiempo = (durationMin) => {
  const durationParse = parseInt(durationMin / 60 + 15) + ' minutos aprox'
  return durationParse
}

export {
  calcularPrecio,
  calcularTiempo
}

