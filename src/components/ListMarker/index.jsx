
import { useContext } from 'react'
import { MiContexto } from '../../Context'

import { Marker } from "@react-google-maps/api"
import extraerColorEstado from '../../Utils/extraeColorEstado'
// eslint-disable-next-line no-unused-vars
import Pedido from '../../Utils/class/Pedido'
// import logo from './../../assets/logo.svg';
// import iconMarker from './../../assets/map-marker-svgrepo-com.svg';
/**
 * Componente que muestra una lista de marcadores en un mapa.
 * @component
 * @param {Object} params - La lista de pedidos.
 * @param {Pedido[]} params.pedidos - La lista de pedidos.
 * @returns {JSX.Element} El componente de lista de marcadores.
 */
const ListMarker = ({ pedidos }) => {
  const context = useContext(MiContexto)
  // const iconMarker = {
  //   url: logo, // URL o path de tu icono personalizado
  //   scaledSize: new window.google.maps.Size(50, 50) // Tamaño del icono
  // };

  const pathIcon = `M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z`



  return (
    <>
      {pedidos.map((pedido, index) => {

        //para le color del marker
        let color = extraerColorEstado(pedido.estado)

        let strokeColor = 'rgb(255, 0, 0)'
        if (pedido?.domiciliario_asignado) {
          strokeColor = 'rgb(0,255,0)'
        }
        const icon = {
          path: pathIcon, // Este es un ejemplo de un marcador SVG cuadrado. Puedes cambiarlo por cualquier otro marcador SVG.
          // scaledSize: new window.google.maps.Size(50, 50),
          fillColor: color, // Color de relleno del marcador
          strokeColor: strokeColor,
          fillOpacity: 1, // Opacidad del relleno
          strokeWeight: 2, // Grosor del borde
          scale: 2 // Escala del marcador
        };

        return (
          <Marker
            key={index}
            position={pedido.address.coordinates}
            title='title'
            animation='DROP'
            label={`${pedido.numeroDeOrdenDelDia}`}
            clickable={true}
            icon={icon}
            visible={true}
            onClick={() => {
              const index = context.items.findIndex(e => e.id == pedido.id)
              context.setIndexItems(index == -1 ? null : index)
            }}
          />
        )
      })}
    </>
  )
}

export default ListMarker