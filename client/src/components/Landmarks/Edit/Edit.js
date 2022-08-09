import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { Error } from "../../Error/Error";
import * as landmarkService from '../../../services/landmarkService';

export const Edit = () => {
    const { isAuth } = useContext(AuthContext);
    const { landmarkId } = useParams();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState('');
    const [errors, setErrors] = useState({});
    const [hasErrors, setHasErrors] = useState(true);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [values, setValues] = useState({
        name: '',
        town: '',
        country: '',
        imageUrl: '',
        description: ''
    });

    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        landmarkService.getOne(landmarkId)
            .then(result => {
                if (!result.message) {
                    setValues({
                        name: result.landmark.name,
                        town: result.landmark.town,
                        country: result.landmark.country,
                        imageUrl: result.landmark.imageUrl,
                        description: result.landmark.description
                    })
                }else throw result
            })
            .catch(error => setServerError(error.message))
    }, []);

    useEffect(() => {
        setHasErrors(Object.values(errors)
            .map(x => Object.values(x).includes(true))
            .includes(true))
    }, [errors]);

    useEffect(() => {
        setBtnDisabled(hasErrors ||
            values.name === '' ||
            values.town === '' ||
            values.country === '' ||
            values.imageUrl === '' ||
            values.description === '')
    }, [hasErrors, values])

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const lengthValidator = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: {
                minLength: values[e.target.name].length < 3,
                maxLength: values[e.target.name].length > 15
            }
        }));
    }

    const descriptionValidator = () => {
        setErrors(state => ({
            ...state,
            description: {
                minLength: values['description'].length < 10,
                maxLength: values['description'].length > 150
            }
        }));
    }

    const imageUrlValidator = () => {
        setErrors(state => ({
            ...state,
            imageUrl: {
                beginning: !(values['imageUrl'].startsWith('https://') ||
                    values['imageUrl'].startsWith('http://') ||
                    values['imageUrl'].startsWith('data:image/'))
            }
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const { name, town, country, imageUrl, description } = values;

        landmarkService.edit(landmarkId, { name, town, country, imageUrl, description })
            .then(result => {
                if (!result.message) {
                    navigate(`/all-landmarks/${landmarkId}`);
                }
            })
            .catch(error => setServerError(error.message))
    }

    return (
        <section id={serverError === '' ? "add" : "add-extended"} className="add-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Edit</h1>
                    <Error message={serverError} />
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        onChange={changeHandler}
                        value={values.name}
                        onBlur={(e) => lengthValidator(e)}
                    />
                    {
                        errors.name?.minLength &&
                        <p className="error">Name must be at least 3 characters long!</p>
                    }

                    {
                        errors.name?.maxLength &&
                        <p className="error">Name can't be more than 15 characters long!</p>
                    }

                    <label htmlFor="town">Town / City:</label>
                    <input
                        type="text"
                        id="town"
                        name="town"
                        onChange={changeHandler}
                        value={values.town}
                        onBlur={(e) => lengthValidator(e)}
                    />
                    {
                        errors.town?.minLength &&
                        <p className="error">Town must be at least 3 characters long!</p>
                    }

                    {
                        errors.town?.maxLength &&
                        <p className="error">Town can't be more than 15 characters long!</p>
                    }

                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        onChange={changeHandler}
                        value={values.country}
                        onBlur={(e) => lengthValidator(e)}
                    />
                    {
                        errors.country?.minLength &&
                        <p className="error">Country must be at least 3 characters long!</p>
                    }

                    {
                        errors.country?.maxLength &&
                        <p className="error">Country can't be more than 15 characters long!</p>
                    }

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        onChange={changeHandler}
                        value={values.imageUrl}
                        onBlur={() => imageUrlValidator()}
                    />
                    {
                        errors.imageUrl?.beginning &&
                        <p className="error">ImageUrl must be a valid url!</p>
                    }

                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        onChange={changeHandler}
                        value={values.description}
                        onBlur={() => descriptionValidator()}
                    />
                    {
                        errors.description?.minLength &&
                        <p className="error">Description must be at least 10 characters long!</p>
                    }

                    {
                        errors.description?.maxLength &&
                        <p className="error">Description can't be more than 150 characters long!</p>
                    }

                    {
                        btnDisabled
                            ? <input type="submit" className="addBtn" value="Edit" disabled />
                            : <input type="submit" className="addBtn" value="Edit" />
                    }
                </div>
            </form>
        </section>
    );
}