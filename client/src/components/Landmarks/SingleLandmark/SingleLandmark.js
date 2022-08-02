import { Link } from "react-router-dom";

export const SingleLandmark = ({ landmark }) => {
    return (
        <div className="singleLandmark">
            <img src={landmark.imageUrl} />
            <div id="landmark-info-container">
                <h2>{landmark.name}</h2>
                <h6>{landmark.town} <br />{landmark.country}</h6>
                <Link to={`/all-landmarks/${landmark._id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
}