import { UtilsApi } from "../utilsApi"

const postOrder = async (order, token, isAdmin = false) => {
  try {
    const rta = await UtilsApi({
      url: isAdmin ? 'pedidos/admin' : 'pedidos',
      method: 'POST',
      body: JSON.stringify(order),
      token
    })

    return rta

  } catch (error) {
    return error
  }
}

export default postOrder