import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

export const SingleLandmark = ({ landmark }) => {
    const { isAuth } = useContext(AuthContext);

    return (
        <div className={`singleLandmark${isAuth?'': ' short'}`}>
            <div className="imageContainer">
                <img src={landmark.imageUrl} />
            </div>
            <div id="landmark-info-container">
                <h2>{landmark.name}</h2>
                <h6>{landmark.town} <br />{landmark.country}</h6>
                {isAuth
                    ? <Link to={`/all-landmarks/${landmark._id}`} className="details-button">Details</Link>
                    : ''
                }

            </div>
        </div>
    );
}