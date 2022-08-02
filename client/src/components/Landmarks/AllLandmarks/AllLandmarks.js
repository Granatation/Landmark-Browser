import { SingleLandmark } from "../SingleLandmark/SingleLandmark";
import { useEffect, useState } from "react";

import * as landmarkService from '../../../services/landmarkService';

export const AllLandmarks = () => {

    const [landmarks, setLandmarks] = useState([]);

    useEffect(() => {
        landmarkService.getAll()
            .then(result => {
                setLandmarks(result);
            })
    }, []);

    return (
        <section id="all-landmarks-page">
            <h1>All Landmarks</h1>

            <div>
                {landmarks.length > 0
                    ? landmarks.map(x => <SingleLandmark key={x._id} landmark={x} />)
                    : <h3 className="no-articles">No landmarks yet</h3>
                }
            </div>
        </section>
    );
}