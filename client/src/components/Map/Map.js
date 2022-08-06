import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

export const Map = () => {
    const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });

    return (
        <>
            <GoogleMap
                center={center}
                zoom={5}
                mapContainerStyle={{
                    height: "50vh",
                    width: "100%"
                }}
            />
            <Marker position={center} />
        </>
    );
}