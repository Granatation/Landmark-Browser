import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as landmarkService from '../../../services/landmarkService';
import { LandmarkContext } from "../../../contexts/LandmarkContext";
import { SingleLandmark } from "../SingleLandmark/SingleLandmark";

export const AllLandmarks = () => {

    const { landmarks, setLandmarks } = useContext(LandmarkContext)

    const navigate = useNavigate();

    useEffect(() => {
        landmarkService.getAll()
            .then(result => {
                setLandmarks(result);
            })
            .catch(error => navigate('/'))
    }, []);

    return (
        <section id="all-landmarks-page">
            <h1>All Landmarks</h1>

            <div id="all-landmarks-container">
                {landmarks.length > 0
                    ? landmarks.map(x => <SingleLandmark key={x._id} landmark={x} />)
                    : <h3 className="no-articles">No landmarks yet</h3>
                }
            </div>

        </section>
    );
}