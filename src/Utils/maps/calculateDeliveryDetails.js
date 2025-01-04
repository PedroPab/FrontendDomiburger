import { obtenerDistancia } from "../../Pages/Recepcion/FormAdmin/googleDistanceMatrix";
import { calcularPrecio, calcularTiempo } from "../matrixCalculate";

const calculateDeliveryDetails = async (centerOrigin, coordinates) => {
  console.log(centerOrigin, coordinates,);
  const dataMatrix = await obtenerDistancia(centerOrigin, coordinates);
  console.log(dataMatrix, '<=dataMatrix');

  if (dataMatrix) {
    const timeText = calcularTiempo(dataMatrix.distance.value);
    const price = calcularPrecio(dataMatrix.distance.value);
    console.log(timeText, price, '<=timeText', '<=price');
    if (!timeText || (!price && price !== 0)) {
      throw new Error('No se pudo calcular el precio del domicilio');
    }

    return {
      timeText,
      price,
    }
  }
};

export { calculateDeliveryDetails };