import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as landmarkService from '../../../services/landmarkService';

export const Details = () => {
    const { landmarkId } = useParams();
    const [landmark, setLandmark] = useState({});
    const [creator, setCreator] = useState({});

    useEffect(() => {
        landmarkService.getOne(landmarkId)
            .then(result => {
                setLandmark(result.landmark);
                setCreator(result.postedBy);
            })

    }, []);

    return (
        <section id="details-section">
            <img src={landmark.imageUrl} />

            <div>
                <h1>Landmark Details</h1>
                <p>&#10039; {landmark.name}</p>
                <p>&#10039; {landmark.town}, {landmark.country}</p>
                <p>&#10039; Posted by: {creator.username}</p>
                <p>&#10039; {landmark.description}</p>
                <p>
                    <span><em>If you have visited this landmark click <Link to=''>here</Link></em></span>
                </p>
                <div id="details-btn-container">
                    <Link id="edit-btn" to={`/all-landmarks/${landmark._id}/edit`} >Edit</Link>
                    <Link id="delete-btn" to={`/all-landmarks/${landmark._id}/delete`} >Delete</Link>
                </div>
            </div>
            
        </section>
    );
}