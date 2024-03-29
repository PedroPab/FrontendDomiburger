
export const createCodeReferidos = async (data, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ENV = import.meta.env
    const apiUrl = `${ENV.VITE_HOST_CODES}/${ENV.VITE_CREATE_CODE || ''}`;

    console.log("🚀 ~ createCodeReferidos ~ apiUrl:", apiUrl)
    const raw = JSON.stringify(data);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(`${apiUrl}?type=Referido`, requestOptions);
    const result = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      throw result
    }

    return result
  } catch (error) {
    throw error
  }
}