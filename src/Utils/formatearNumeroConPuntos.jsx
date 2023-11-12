export default function formatearNumeroConPuntos(numero) {
  // Convertir el número a una cadena para facilitar el manejo
  let numeroComoTexto = numero.toString();
  // Usar expresiones regulares para agregar los puntos de miles
  numeroComoTexto = numeroComoTexto.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${numeroComoTexto}`;
}

