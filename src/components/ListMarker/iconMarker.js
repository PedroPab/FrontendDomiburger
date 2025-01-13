import { listaEstados } from '../../Utils/listEstados';

const generateSvgColor = (color) => {
  const iconMarker = {
    path: "m -0.55 -29.9954 c -8.4296 0 -18.2734 5.1562 -18.2734 18.2734 c 0 8.8984 14.0546 28.5704 18.2734 33.7266 c 3.75 -5.1562 18.2734 -24.3594 18.2734 -33.7266 c 0 -13.1172 -9.8438 -18.2734 -18.2734 -18.2734 z m 0 0",
    fillColor: color,
    fillOpacity: 2,
    // anchor: { x: 18.4, y: 18.4 },
    // origin: { x: 50, y: 100 }
  };
  return iconMarker
}
const iconMarker = (estado) => {
  //cambia el color del marker (svg) según  el estado
  const markerColorStates = (estate) => {
    const markerColorStates = {}

    for (const key in listaEstados) {
      if (Object.prototype.hasOwnProperty.call(listaEstados, key)) {
        const element = listaEstados[key];
        markerColorStates[element.name] = generateSvgColor(element.color)
      }
    }

    if (markerColorStates === undefined) {
      return generateSvgColor(`#b82100`)
    }

    return markerColorStates[estate]
  }

  const icon = markerColorStates(estado)
  return icon
}

export { iconMarker }