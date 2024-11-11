import { getUrlCodigos } from "../../getUrlApiByOriginPath";

export const findCodigo = async (codigo, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // const apiUrl = `${ENV.VITE_HOST_CODES}/${ENV.VITE_SEARCH_CODE || ''}`;
    const apiUrlCode = getUrlCodigos()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(`${apiUrlCode}/id/${codigo}`, requestOptions);
    const result = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      throw result
    }

    return result
  } catch (error) {
    throw error
  }
}