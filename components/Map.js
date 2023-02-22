import React, { useMemo } from 'react'
import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';

const Map = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })

    const defaultProps = {

        zoom: 11
    };
    
    const center = useMemo(()=>({lat: 25.1557, lng: 55.3003}), [])

  return (
    <GoogleMap 
        zoom = {defaultProps.zoom}
        center= {center}
        mapContainerClassName="mapContainer"

    >
        <MarkerF position={center}/>

    </GoogleMap>
  )
}

export default Map