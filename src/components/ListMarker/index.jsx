
import { useContext } from 'react'
import { MiContexto } from '../../Context'

import { Marker } from "@react-google-maps/api"

const ListMarker = ({ pedidos }) => {
  const context = useContext(MiContexto)

  return (
    <>
      {pedidos.map((pedido, index) => (
        <Marker
          key={index}
          position={pedido.data.address.coordinates}
          title='title'
          animation='DROP'
          label={`${pedido.data.numeroDeOrdenDelDia}`}
          clickable={true}
          icon=''
          visible={true}
          onClick={() => {
            console.log(`se clico el peidod ${pedido.data.id}`)
            const index = context.items.findIndex(e => e.data.id == pedido.data.id)
            console.log("🚀 ~ file: index.jsx:24 ~ ListMarker ~ index:", index)
            context.setIndexItems(index == -1 ? null : index)
          }}
        />
      ))}
    </>
  )
}

export default ListMarker