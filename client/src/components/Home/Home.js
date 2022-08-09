import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { LandmarkContext } from "../../contexts/LandmarkContext";
import { SingleLandmark } from "../Landmarks/SingleLandmark/SingleLandmark";
import * as landmarkService from '../../services/landmarkService';
import { Error } from "../Error/Error";

export const Home = () => {
    const { landmarks, setLandmarks } = useContext(LandmarkContext);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        landmarkService.getAll()
            .then(result => {
                if (!result.message) {
                    setLandmarks(result);
                } else throw result
            })
            .catch(error => setServerError(error.message))
    }, []);

    let landmarksSorted = landmarks?.sort((a, b) => b.visitors.length - a.visitors.length)
    landmarksSorted = landmarksSorted?.slice(0, 3);

    return (


        <section id="all-landmarks-page">
            <div id="welcome">
                <h1>Welcome to Landmark Browser</h1>
            </div>

            <Error message={serverError} />

            {
                landmarksSorted.length > 0 &&

                <h1>Here are the most visited landmarks</h1>
            }


            <div>
                {landmarksSorted.length > 0
                    ? landmarksSorted.map(x => <SingleLandmark key={x._id} landmark={x} />)
                    : <h3 className="no-articles">No landmarks yet</h3>
                }
            </div>
            {
                landmarksSorted.length > 0 &&

                <p id="home-para">
                    <Link to='/all-landmarks'><em>Browse all landmarks</em></Link>
                </p>
            }

        </section>
    );
}