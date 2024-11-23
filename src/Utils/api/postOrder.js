import { UtilsApiV2 } from "../utilsApi"

const postOrder = async (order, token, isAdmin = false) => {
  const rta = await UtilsApiV2({
    path: isAdmin ? 'pedidos/admin' : 'pedidos',
    method: 'POST',
    body: JSON.stringify(order),
    token
  })
  const body = rta?.body?.body

  if (rta?.response?.status != 201 && rta?.response?.status != 200) {
    throw body
  }

  return body
}

export default postOrder