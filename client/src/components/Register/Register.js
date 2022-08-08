import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import { Error } from "../Error/Error";

import * as authService from '../../services/authService';

export const Register = () => {
    const { userLogin, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [clientErrors, setClientErrors] = useState({})
    const [hasErrors, setHasErrors] = useState(true)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [serverError, setServerError] = useState('')
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        repass: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if (isAuth) {
            return navigate('/404');
        }
    }, []);

    useEffect(() => {
        setHasErrors(Object.values(clientErrors)
            .map(x => Object.values(x).includes(true))
            .includes(true))
    }, [clientErrors]);

    useEffect(() => {
        setBtnDisabled(hasErrors ||
            values.username === '' ||
            values.email === '' ||
            values.password === '' ||
            values.repass === '')
    }, [hasErrors, values])

    const onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, repass } = values

        authService.register(username, email, password, repass)
            .then(result => {
                if (!result.message) {
                    userLogin(result);
                    navigate('/');
                } else throw result
            })
            .catch(error => {
                setServerError(error.message);
            })
    }

    const lengthValidator = (e) => {
        setClientErrors(state => ({
            ...state,
            [e.target.name]: {
                minLength: values[e.target.name].length < 10,
                maxLength: values[e.target.name].length > 25
            }
        }));
    }

    const usernameLengthValidator = () => {
        setClientErrors(state => ({
            ...state,
            username: {
                minLength: values['username'].length < 3,
                maxLength: values['username'].length > 12
            }
        }));
    }

    return (
        <section id={serverError === '' ? "register" : "register-extended"} className="form-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Register</h1>
                    <Error message={serverError} />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="someone"
                        onChange={changeHandler}
                        value={values.username}
                        onBlur={() => usernameLengthValidator()}
                    />
                    {
                        clientErrors.username?.minLength &&
                        <p className="error">Email must be at least 3 characters long!</p>
                    }

                    {
                        clientErrors.username?.maxLength &&
                        <p className="error">Email can't be more than 12 characters long!</p>
                    }

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email@sth.com"
                        onChange={changeHandler}
                        value={values.email}
                        onBlur={(e) => lengthValidator(e)}
                    />

                    {
                        clientErrors.email?.minLength &&
                        <p className="error">Email must be at least 10 characters long!</p>
                    }

                    {
                        clientErrors.email?.maxLength &&
                        <p className="error">Email can't be more than 25 characters long!</p>
                    }

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="**********"
                        onChange={changeHandler}
                        value={values.password}
                        onBlur={(e) => lengthValidator(e)}
                    />

                    {
                        clientErrors.password?.minLength &&
                        <p className="error">Password must be at least 10 characters long!</p>
                    }

                    {
                        clientErrors.password?.maxLength &&
                        <p className="error">Password can't be more than 25 characters long!</p>
                    }

                    <label htmlFor="repass">Repeat password:</label>
                    <input
                        type="password"
                        name="repass"
                        placeholder="**********"
                        onChange={changeHandler}
                        value={values.repass}
                        onBlur={(e) => lengthValidator(e)}
                    />

                    {
                        clientErrors.repass?.minLength &&
                        <p className="error">Password must be at least 10 characters long!</p>
                    }

                    {
                        clientErrors.repass?.maxLength &&
                        <p className="error">Password can't be more than 25 characters long!</p>
                    }

                    {
                        btnDisabled
                            ? <input type="submit" className="submit" value="Register" disabled />
                            : <input type="submit" className="submit" value="Register" />
                    }

                    <p className="auth-paragraph-register">
                        <span><em>If you already have profile click <Link to="/login">here</Link></em></span>
                    </p>
                </div>
            </form>
        </section>
    );
}