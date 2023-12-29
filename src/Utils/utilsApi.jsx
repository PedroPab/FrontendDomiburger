
export const traladarPedidoDeEstado = async ({ id, estado, token }) => {
  const ENV = import.meta.env
  const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`;

  const TOKEN = `Bearer ${token}`

  const options = {
    method: 'POST',
    headers: {
      Authorization: TOKEN
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/estados/${estado}?idPedido=${id}`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data, '<=data');
        if (!data.body) throw data
        return data
      })
      .then(data => resolve(data.body))
      .catch(error => reject(error))
  })
}

export const UtilsApi = async ({ peticion, token, vervo = 'POST', body }) => {
  const ENV = import.meta.env
  const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`;

  const TOKEN = `Bearer ${token}`
  const headers = {}
  token ? headers.Authorization = TOKEN : undefined
  const options = {
    method: vervo,
    headers,
  }
  if (body) {
    options.body = body
    options.headers[`Content-Type`] = "application/json"
  }


  console.log(options);

  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/${peticion}`, options)
      .then(response => response.json())
      .then(data => {
        if (!data.body) throw data
        return data
      })
      .then(data => resolve(data.body))
      .catch(error => reject(error))
  })
}