/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useRef } from 'react'
import { MiContexto } from '../../Context'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { memo, useCallback, useState } from 'react';
const ENV = import.meta.env

function Mapa({ center, containerStyle, zoom, children, setCenter }) {
  const context = useContext(MiContexto)
  const mapRef = useRef(null); // Crea una referencia usando useRef

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-domiburguer',
    googleMapsApiKey: ENV.VITE_KEYMAPS
  })
  const handleZoomChanged = () => {
    // const currentZoom = mapRef.current.getZoom();
    console.log(`Zoom actual: ${context.zoomMaps}`);
    // console.log("🚀 ~ file: index.jsx:22 ~ handleZoomChanged ~ mapRef:", mapRef.current.state.map.zoom)
    const zoom = mapRef.current?.state?.map?.zoom
    zoom ? context.setZoomMaps(zoom) : null

  };

  // cuando movamos el mapa se actualisa el centro del mapa , para que cuando actualisamoes se nos guarede
  const handleCenterChanged = () => {
    const center = mapRef.current?.state?.map?.center

    // console.log(`el centro actual es de `, {
    //   lat: center.lat(),
    //   lng: center.lng(),
    // });

    if (!center) return

    setCenter({
      lat: center.lat(),
      lng: center.lng(),
    })
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={context.zoomMaps}
      onZoomChanged={handleZoomChanged} // Agregar el manejador de evento onZoomChanged
      ref={mapRef}
      onMouseUp={handleCenterChanged}
    >
      {children}
    </GoogleMap>
  ) : <></>
}

export default memo(Mapa)