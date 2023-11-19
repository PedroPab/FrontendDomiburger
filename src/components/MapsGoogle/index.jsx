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

  //tema oscuro
  const darkThemeStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
  const mapOptions = {
    styles: context.modoOscuro ? darkThemeStyles : []
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={context.zoomMaps}
      onZoomChanged={handleZoomChanged} // Agregar el manejador de evento onZoomChanged
      ref={mapRef}
      onMouseUp={handleCenterChanged}
      options={mapOptions}
    >
      {children}
    </GoogleMap>
  ) : <></>
}

export default memo(Mapa)