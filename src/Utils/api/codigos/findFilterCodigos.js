// eslint-disable-next-line no-unused-vars
export const findFilterCodigos = async (params, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const queryString = buildQuery(params);
    const ENV = import.meta.env
    const apiUrl = `${ENV.VITE_HOST_CODES}/filter${queryString}
`;


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //convert el objeto filter en un query params
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(`${apiUrl}`, requestOptions);
    const result = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      throw result
    }

    return result
  } catch (error) {
    throw error
  }
}

function buildQuery(params) {
  // Mapea los parámetros y construye cada par clave-valor
  const rta = params.map(param => {
    // Codifica tanto el nombre como el valor del parámetro para evitar errores en la URL
    const key = encodeURIComponent(param.key);
    const value = encodeURIComponent(param.value);
    return `${key}=${value}`;
  }).join('&')

  return `?${rta}`; // Une los pares con '&' para formar la query completa
}