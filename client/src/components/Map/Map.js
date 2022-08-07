import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, } from "@react-google-maps/api";

export const Map = (props) => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: ""
    });


    const renderMap = () => {
        return (
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{
                    height: "373px",
                    width: "400px"
                }}
            >
                <Marker
                    position={center}
                />
            </GoogleMap>
        );
    };

    return isLoaded ? renderMap() : null;
}