
import { useContext, useRef } from 'react'
import { MiContexto } from '../../Context'

import { Marker } from "@react-google-maps/api"
import logo from './../../assets/logo.svg';
import { listIconForEstado } from '../../Utils/maps/listIconForEstado';


const ListMarker = ({ pedidos, mapRef }) => {
  const context = useContext(MiContexto)
  const markersRef = useRef([]);

  return (
    <>
      {pedidos.map((pedido, index) => {
        //el incono del marker se cambia segun su esatado y si tiene un domiciliario asignado
        let icon = generateIconForEstado(pedido.estado, pedido.domiciliario)

        const handleClickMarker = (pedido, index) => {
          const marker = markersRef.current[index];
          if (!marker) return;

          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div><h5>Pedido #${pedido.numeroDeOrdenDelDia}</h5><p>${pedido.estado}</p></div>`,
          });

          infoWindow.open({
            anchor: marker,
            map: mapRef.current.map,
            shouldFocus: false,
          });
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
            onLoad={(marker) => (markersRef.current[index] = marker)}
            onClick={() => {
              const index = context.items.findIndex(e => e.id == pedido.id)
              context.setIndexItems(index == -1 ? null : index)
              handleClickMarker(pedido, index)
            }}
          />
        )
      })}
    </>
  )
}

export default ListMarker

const generateIconForEstado = (estado, domiciliario) => {
  // escogemos el icono según el estado del pedido
  const urlIcon = listIconForEstado[estado] || logo

  return {
    url: urlIcon, // URL o path de tu icono personalizado
    scaledSize: new window.google.maps.Size(40, 40) // Tamaño del icono
  };
}