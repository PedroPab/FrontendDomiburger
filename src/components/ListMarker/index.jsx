
import { useContext } from 'react'
import { MiContexto } from '../../Context'

import { Marker } from "@react-google-maps/api"
// import logo from './../../assets/logo.svg';

const ListMarker = ({ pedidos }) => {
  const context = useContext(MiContexto)
  // const iconMarker = {
  //   url: logo, // URL o path de tu icono personalizado
  //   scaledSize: new window.google.maps.Size(50, 50) // Tamaño del icono
  // };


  return (
    <>
      {pedidos.map((pedido, index) => (
        <Marker
          key={index}
          position={pedido.address.coordinates}
          title='title'
          animation='DROP'
          label={`${pedido.numeroDeOrdenDelDia}`}
          clickable={true}
          // icon={iconMarker}
          visible={true}
          onClick={() => {
            const index = context.items.findIndex(e => e.id == pedido.id)
            context.setIndexItems(index == -1 ? null : index)
          }}
        />
      ))}
    </>
  )
}

export default ListMarker