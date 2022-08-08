import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as landmarkService from '../../../services/landmarkService';
import { LandmarkContext } from "../../../contexts/LandmarkContext";
import { SingleLandmark } from "../SingleLandmark/SingleLandmark";

export const AllLandmarksPaged = () => {
    const { landmarks, setLandmarks } = useContext(LandmarkContext);
    const [pages, setPages] = useState(0);
    const { pageNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        landmarkService.getAll()
            .then(result => {
                setLandmarks(result);
                setPages(Math.ceil(result.length / 6));
            })
            .catch(error => alert(error))
    }, []);

    const currentPageLandmarks = landmarks?.slice((0 + (Number(pageNumber) - 1) * 6), (6 + (Number(pageNumber) - 1) * 6));

    let liItems = [];

    for (let i = 1; i <= pages; i++) {
        liItems.push(
            <Link
                className={Number(pageNumber) == i ? 'active' : null}
                key={i}
                to={`/all-landmarks/page/${i}`}
            >
                {i}
            </Link>);
    }

    const previousButtonHandler = () => {
        if (Number(pageNumber) - 1 > 0) {
            navigate(`/all-landmarks/page/${Number(pageNumber) - 1}`);
        }
    }

    const nextButtonHandler = () => {
        if (Number(pageNumber) + 1 <= pages) {
            navigate(`/all-landmarks/page/${Number(pageNumber) + 1}`);
        }
    }


    return (
        <section id="all-landmarks-page">
            <h1>All Landmarks</h1>

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