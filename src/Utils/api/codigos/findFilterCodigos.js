// eslint-disable-next-line no-unused-vars
export const findFilterCodigos = async (filter, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const ENV = import.meta.env
    const apiUrl = `${ENV.VITE_HOST_CODES}/${ENV.VITE_FILTER_CODE || 'filter'}`;

    console.log("🚀 ~ findFilterCodigos ~ apiUrl:", apiUrl)
    const raw = JSON.stringify(filter);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //convert el objeto filter en un query params
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
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