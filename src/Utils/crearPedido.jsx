import { UtilsApi } from "./utilsApi"

const crearPedido = async (data) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)

    UtilsApi({ peticion: 'pedidos', vervo: 'POST', body })
      .then(response => {
        console.log(response);
        resolve(response)
      })
      .catch(error => {
        console.log(error);
        reject(error)
      })
  })


}


export default crearPedido