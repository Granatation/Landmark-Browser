import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, } from "@react-google-maps/api";

export const Map = (props) => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });

    const ApiKey = 'pk.02857f2248384facc8e11c8d98f8070a'

    useEffect(() => {
        fetch(`https://us1.locationiq.com/v1/search?key=${ApiKey}&q=${props.location.name.trimStart().trimEnd().replace(' ', '%20')}%20${props.location.town.trimStart().trimEnd().replace(' ', '%20')}%20${props.location.country.trimStart().trimEnd().replace(' ', '%20')}&format=json`)
            .then(res => res.json())
            .then(result => {
                setCenter({
                    lat: Number(result[0].lat),
                    lng: Number(result[0].lon)
                })
            })
            .catch(err => console.log(err))
    }, [])

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