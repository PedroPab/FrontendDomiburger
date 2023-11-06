/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useContext, useRef } from 'react'
import { MiContexto } from '../../Context'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { memo, useCallback, useState } from 'react';
const ENV = import.meta.env

function MyComponent({ center, containerStyle, zoom, children }) {
  const mapRef = useRef(null); // Crea una referencia usando useRef
  const context = useContext(MiContexto)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-domiburguer',
    googleMapsApiKey: ENV.VITE_KEYMAPS
  })
  const handleZoomChanged = () => {
    // const currentZoom = mapRef.current.getZoom();
    console.log(`Zoom actual: ${mapRef}`);
    console.log("🚀 ~ file: index.jsx:22 ~ handleZoomChanged ~ mapRef:", mapRef)
    console.log("🚀 ~ file: index.jsx:22 ~ handleZoomChanged ~ mapRef:", mapRef.current
    )

  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={context.zoomMaps}
      onZoomChanged={handleZoomChanged} // Agregar el manejador de evento onZoomChanged
      ref={mapRef}
    >
      {children}
    </GoogleMap>
  ) : <></>
}

export default memo(MyComponent)