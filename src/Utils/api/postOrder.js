import { UtilsApi } from "../utilsApi"

const postOrder = async (order, token, isAdmin = false) => {
  try {
    const rta = await UtilsApi({
      peticion: isAdmin ? 'pedidos/admin' : 'pedidos',
      vervo: 'POST',
      body: JSON.stringify(order),
      token
    })

    return rta

  } catch (error) {
    return error
  }
}

export default postOrder