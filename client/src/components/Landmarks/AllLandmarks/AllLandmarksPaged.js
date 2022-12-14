import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as landmarkService from '../../../services/landmarkService';
import { LandmarkContext } from "../../../contexts/LandmarkContext";
import { AuthContext } from '../../../contexts/AuthContext'
import { SingleLandmark } from "../SingleLandmark/SingleLandmark";
import { Error } from "../../Error/Error";

export const AllLandmarksPaged = () => {
    const { landmarks, setLandmarks } = useContext(LandmarkContext);
    const [filteredLandmarks, setFilteredLandmarks] = useState();
    const { isAuth } = useContext(AuthContext);
    const [pages, setPages] = useState(0);
    const [serverError, setServerError] = useState('');
    const [searchString, setSearchString] = useState('');
    const { pageNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        landmarkService.getAll()
            .then(result => {
                if (!result.message) {
                    setLandmarks(result);
                    setFilteredLandmarks(result);
                    setPages(Math.ceil(result.length / 6));
                } else throw result
            })
            .catch(error => setServerError(error.message))
    }, []);

    const currentPageLandmarks = filteredLandmarks?.slice((0 + (Number(pageNumber) - 1) * 6), (6 + (Number(pageNumber) - 1) * 6));

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

    const changeHandler = (e) => {
        setSearchString(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setFilteredLandmarks(landmarks
            .filter(x => x.name.toLowerCase().includes(searchString.toLowerCase())));

        if (searchString === '') {
            setPages(Math.ceil(landmarks.length / 6));
        } else {
            setPages(Math.ceil(landmarks
                .filter(x => x.name.toLowerCase().includes(searchString.toLowerCase()))
                .length / 6));
        }
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

            {
                isAuth &&
                <>
                    <input
                        id="search-bar"
                        onChange={changeHandler}
                        placeholder="Search"
                        value={searchString}
                    />
                    <button
                        id="search-button"
                        onClick={submitHandler}
                        type="submit"
                    >
                        Search
                    </button>
                </>
            }

            <Error message={serverError} />

            <div id="all-landmarks-container">
                {currentPageLandmarks?.length > 0
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