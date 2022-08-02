import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as landmarkService from '../../services/landmarkService';

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
                <p>{landmark.name}</p>
                <p>{landmark.town}</p>
                <p>{landmark.country}</p>
                <p>Posted by: {creator.username}</p>
                <p >{landmark.description}</p>
                <div id="details-btn-container">
                    <Link id="edit-btn" to={`/all-landmarks/${landmark._id}/edit`} >Edit</Link>
                    <Link id="delete-btn" to={`/all-landmarks/${landmark._id}/delete`} >Delete</Link>
                </div>
            </div>
        </section>
    );
}