import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as landmarkService from '../../../services/landmarkService';

import { Map } from "../../Map/Map";

export const Details = () => {
    const { landmarkId } = useParams();
    const { user, isAuth } = useContext(AuthContext);
    const navigate = useNavigate()

    const [landmark, setLandmark] = useState({});
    const [creator, setCreator] = useState({});
    const [isMap, setIsMap] = useState(false);


    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        landmarkService.getOne(landmarkId)
            .then(result => {
                setLandmark(result.landmark);
                setCreator(result.postedBy);
            })

    }, []);

    const onClickHandler = () => {
        setIsMap(state => !state);
    }

    return (
        <section id="details-section">
            <div id="details-image-map-container">
                <div id="details-image-container">
                    {isMap 
                    ?  <Map id="map" location={landmark.name}/>
                    : <img src={landmark.imageUrl} /> 
                    }
                   
                </div>
                <button onClick={onClickHandler} id="map-btn">{isMap ? 'Image' : 'Map'}</button>
                <p>{isMap ? 'See the image' : 'See the location on map'}</p>
            </div>


            <div id="details-container">
                <h1>Landmark Details</h1>
                <p>&#10039; Name: {landmark.name}</p>
                <p>&#10039; Location: {landmark.town}, {landmark.country}</p>
                <p>&#10039; Posted by: {creator.username}</p>
                <p>&#10039; Description: {landmark.description}</p>
                <p>&#10039; Visitors: {landmark.visitors?.length}</p>
                {
                    user._id !== creator._id && !landmark.visitors?.includes(user._id) &&
                    <p>
                        <span><em>If you have visited this landmark click <Link to={`/all-landmarks/${landmark._id}/visit`}>here</Link></em></span>
                    </p>
                }
                {
                    user._id === creator._id &&
                    <div id="details-btn-container">
                        <Link id="edit-btn" to={`/all-landmarks/${landmark._id}/edit`} >Edit</Link>
                        <Link id="delete-btn" to={`/all-landmarks/${landmark._id}/delete`} >Delete</Link>
                    </div>
                }


            </div>

        </section>
    );
}