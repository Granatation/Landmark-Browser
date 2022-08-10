import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import * as authService from '../../services/authService';
import { LandmarkContext } from "../../contexts/LandmarkContext";
import { AuthContext } from "../../contexts/AuthContext";
import { SingleLandmark } from "../Landmarks/SingleLandmark/SingleLandmark";
import { Error } from "../Error/Error";

export const MyProfilePaged = () => {
    const { landmarks, setLandmarks } = useContext(LandmarkContext);
    const { user, isAuth } = useContext(AuthContext);
    const [serverError, setServerError] = useState('');
    const [filteredLandmarks, setFilteredLandmarks] = useState()
    const [searchString, setSearchString] = useState('');
    const [pages, setPages] = useState(0);
    const { pageNumber } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        authService.getUserLandmarks()
            .then(result => {
                if(!result.message){
                    setLandmarks(result);
                    setFilteredLandmarks(result);
                    setPages(Math.ceil(result.length / 6))
                }else throw result         
            })
            .catch(error => setServerError(error.message))
    }, []);

    useEffect(() => {
        if (searchString === '') {
            setPages(Math.ceil(landmarks.length / 6));
        } else {
            setPages(Math.ceil(searchString.length / 6));
        }
    }, [searchString])

    const currentPageLandmarks = filteredLandmarks?.slice((0 + (Number(pageNumber) - 1) * 6), (6 + (Number(pageNumber) - 1) * 6))

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

    const changeHandler = (e) => {
        setSearchString(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setFilteredLandmarks(landmarks
            .filter(x => x.name.toLowerCase().includes(searchString.toLowerCase())));
    }

    const previousButtonHandler = () => {
        if (Number(pageNumber) - 1 > 0) {
            navigate(`/my-profile/page/${Number(pageNumber) - 1}`);
        }
    }

    const nextButtonHandler = () => {
        if (Number(pageNumber) + 1 <= pages) {
            navigate(`/my-profile/page/${Number(pageNumber) + 1}`);
        }
    }


    return (
        <section id="all-landmarks-page">
            <div id="welcome">
                <h1>{user.username}'s posts</h1>
            </div>

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