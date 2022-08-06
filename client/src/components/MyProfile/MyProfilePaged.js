import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as authService from '../../services/authService';
import { LandmarkContext } from "../../contexts/LandmarkContext";
import { AuthContext } from "../../contexts/AuthContext";
import { SingleLandmark } from "../Landmarks/SingleLandmark/SingleLandmark";

export const MyProfilePaged = () => {
    const { landmarks, setLandmarks } = useContext(LandmarkContext);
    const { user,isAuth } = useContext(AuthContext);
    const [pages, setPages] = useState(0);
    const { pageNumber } = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        authService.getUserLandmarks()
            .then(result => {
                setLandmarks(result);
                setPages(Math.ceil(result.length / 6))
            })
            .catch(error => alert(error))
    }, []);

    const currentPageLandmarks = landmarks.slice((0 + (Number(pageNumber) - 1) * 6), (6 + (Number(pageNumber) - 1) * 6))

    let liItems = []

    for (let i = 1; i <= pages; i++) {
        liItems.push(
            <Link
                className={Number(pageNumber) == i ? 'active' : null}
                key={i}
                to={`/my-profile/page/${i}`}
            >
                {i}
            </Link>);
    }

    const previousButtonHandler = () => {
        if (Number(pageNumber)-1>0){
            navigate(`/my-profile/page/${Number(pageNumber)-1}`)
        }
    }

    const nextButtonHandler = () => {
        if (Number(pageNumber)+1<=pages){
            navigate(`/my-profile/page/${Number(pageNumber)+1}`)
        }
    }


    return (
        <section id="all-landmarks-page">
            <div id="welcome">
                <h1>{user.username}'s posts</h1>
            </div>

            <div id="all-landmarks-container">
                {currentPageLandmarks.length > 0
                    ? currentPageLandmarks.map(x => <SingleLandmark key={x._id} landmark={x} />)
                    : <h3 className="no-articles">No landmarks yet</h3>
                }
            </div>

            <div className="pagination">
                <button onClick={previousButtonHandler}>&laquo;</button>
                {liItems}
                <button onClick={nextButtonHandler}>&raquo;</button>
            </div>

        </section>
    );
}