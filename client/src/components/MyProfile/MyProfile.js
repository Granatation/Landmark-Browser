import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { LandmarkContext } from "../../contexts/LandmarkContext";
import { AuthContext } from "../../contexts/AuthContext";
import { SingleLandmark } from "../Landmarks/SingleLandmark/SingleLandmark";
import * as authService from '../../services/authService';

export const MyProfile = () => {
    const { landmarks, setLandmarks } = useContext(LandmarkContext);
    const { user, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        authService.getUserLandmarks()
            .then(result => {
                setLandmarks(result);
            })
            .catch(error => alert(error))
    }, []);

    return (


        <section id="all-landmarks-page">
            <div id="welcome">
                <h1>{user.username}'s posts</h1>
            </div>

            <div>
                {landmarks.length > 0
                    ? landmarks.map(x => <SingleLandmark key={x._id} landmark={x} />)
                    : <h3 className="no-articles">No landmarks yet</h3>
                }
            </div>
        </section>
    );
}