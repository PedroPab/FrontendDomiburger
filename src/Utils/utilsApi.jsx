
export const traladarPedidoDeEstado = async ({ id, estado }) => {
  const ENV = import.meta.env
  const apiUrl = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}`;

  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzeXVWWXI2MDlUaUltcXQxeUtwQSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4MjM2MjQ1Mn0.ypWAj30EdC8J74TcO3BaXzzRBsaMddhdUe-Iumu4lhs"

  const options = {
    method: 'POST',
    headers: {
      Authorization: token
    }
  }

  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/estados/${estado}?idPedido=${id}`, options)
      .then(response => response.json())
      .then(data => {
        console.log(data, '<=data');
        if (!data.data) throw data
        return data
      })
      .then(data => resolve(data.body))
      .catch(error => reject(error))
  })
}