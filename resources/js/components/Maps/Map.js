import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { useEffect } from 'react'

const Map = ({ center, zoom, onClick, ...props }) => {
    const [mapCenter, setMapCenter] = useState([14.985237032330026, 102.10342302037994])

    useEffect(() => {
        if (center) {
            setMapCenter(center)
        }
    }, [center])

    return (
        <>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.MIX_GMAP_KEY }}
                defaultCenter={mapCenter}
                defaultZoom={15}
                yesIWantToUseGoogleMapApiInternals
                onClick={(e) => onClick({ lat: e.lat, lng: e.lng })}
            >

            </GoogleMapReact>
        </>
    )
}

export default Map
