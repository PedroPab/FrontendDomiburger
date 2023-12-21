import { useContext } from "react";
import ProgressDataDomiciliario from "../ProgressDataDomiciliario";
import { RecepcionContexto } from "../../Context/RecepcionContex";

const ListEstadisticasDomiciliarios = ({ pedidos }) => {
  const contex = useContext(RecepcionContexto)
  //miramos todos los domiciliarios para obter todos los tados
  const domiciliarios = contex.users

  //dividimos los pedidos por domicilairo asignado
  const pedidoPorDomiciliario = pedidos?.reduce((objeto, item) => {
    const idD = item?.domiciliario_asignado?.id

    //miramos si exisete el key con el id del domiciliairo
    if (!objeto[idD]) objeto[idD] = []

    objeto[idD].push(item); // reemplaza 'clave' y 'valor' con las propiedades relevantes de tus items
    return objeto;
  }, {});

  const listPedidosD = Object.values(pedidoPorDomiciliario)

  return (
    <>

      <div className="d-flex justify-content-around align-items-center">

        {
          listPedidosD?.map((pedidos, index) => {
            let domiciliairo
            const idDomiciliario = pedidos[0]?.domiciliario_asignado?.id
            const domiciliarioIndex = domiciliarios.findIndex(element => element.id == idDomiciliario)
            if (domiciliarioIndex == -1) {
              domiciliairo = {}
            } else {
              domiciliairo = domiciliarios[domiciliarioIndex]
            }


            return (
              <div
                className="mt-5"
                key={index}
                style={{ margin: '10px' }} // Añade un margen alrededor del div

              >
                <h3 className="text-center">{domiciliairo.name}</h3>

                <ProgressDataDomiciliario
                  pedidos={pedidos}
                />
              </div>
            )
          })
        }
      </div >

    </>
  )
}

export default ListEstadisticasDomiciliarios