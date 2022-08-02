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
        <section>
            <h1>Landmark Details</h1>
            <div>

                <div>
                    <img src={landmark.imageUrl} />
                    <h1>{landmark.name}</h1>
                    <h1>{landmark.town}</h1>
                    <h1>{landmark.country}</h1>
                    <h1>Posted by: {creator.username}</h1>
                </div>

                <p >
                    {landmark.description}
                </p>

                <div className="buttons">
                    <Link to={`/all-landmarks/${landmark._id}/edit`} className="button">Edit</Link>
                    <Link to={`/all-landmarks/${landmark._id}/delete`} className="button">Delete</Link>
                </div>
            </div>

        </section>
    );
}