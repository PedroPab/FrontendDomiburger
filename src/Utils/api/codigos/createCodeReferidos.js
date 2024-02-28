
export const createCodeReferidos = async (data, token) => {
  try {
    const ENV = import.meta.env
    const apiUrl = `${ENV.VITE_PROTOCOL_CODES}${ENV.VITE_HOST_CODES}:${ENV.VITE_PORT_CODES}`;

    const raw = JSON.stringify(data);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(`${apiUrl}/Referido`, requestOptions);
    const result = await response.text();
    return result
  } catch (error) {
    return error
  }
}