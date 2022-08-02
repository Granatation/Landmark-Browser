// import { Link } from "react-router-dom";

export const SingleLandmark = ({landmark}) => {
    return (
            <div>
                <img src={landmark.imageUrl} />
                <h6>{landmark.town} {landmark.country}</h6>
                <h2>{landmark.name}</h2>
                {/* <Link to={`/catalog/${game._id}`} className="details-button">Details</Link> */}
            </div>
    );
}