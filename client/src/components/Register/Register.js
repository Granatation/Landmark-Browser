import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Register = () => {
    const { userLogin, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const [hasErrors, setHasErrors] = useState(true)
    const [btnDisabled, setBtnDisabled] = useState(true)
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
        setHasErrors(Object.values(errors)
            .map(x => Object.values(x).includes(true))
            .includes(true))
    }, [errors]);

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
                userLogin(result)
                if (result) navigate('/');
            })
            .catch(error => alert(error.message))
    }

    const lengthValidator = (e) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: {
                minLength: values[e.target.name].length < 10,
                maxLength: values[e.target.name].length > 25
            }
        }));
    }

    const usernameLengthValidator = () => {
        setErrors(state => ({
            ...state,
            username: {
                minLength: values['username'].length < 6,
                maxLength: values['username'].length > 12
            }
        }));
    }

    return (
        <section id="register" className="form-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Register</h1>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="someone"
                        onChange={changeHandler}
                        value={values.username}
                        onBlur={() => usernameLengthValidator()}
                    />
                    {
                        errors.username?.minLength &&
                        <p className="error">Email must be at least 6 characters long!</p>
                    }

                    {
                        errors.username?.maxLength &&
                        <p className="error">Email can't be more than 12 characters long!</p>
                    }

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@sth.com"
                        onChange={changeHandler}
                        value={values.email}
                        onBlur={(e) => lengthValidator(e)}
                    />

                    {
                        errors.email?.minLength &&
                        <p className="error">Email must be at least 10 characters long!</p>
                    }

                    {
                        errors.email?.maxLength &&
                        <p className="error">Email can't be more than 25 characters long!</p>
                    }

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="**********"
                        onChange={changeHandler}
                        value={values.password}
                        onBlur={(e) => lengthValidator(e)}
                    />

                    {
                        errors.password?.minLength &&
                        <p className="error">Password must be at least 10 characters long!</p>
                    }

                    {
                        errors.password?.maxLength &&
                        <p className="error">Password can't be more than 25 characters long!</p>
                    }

                    <label htmlFor="repass">Repeat password:</label>
                    <input
                        type="password"
                        id="repass"
                        name="repass"
                        placeholder="**********"
                        onChange={changeHandler}
                        value={values.repass}
                        onBlur={(e) => lengthValidator(e)}
                    />

                    {
                        errors.repass?.minLength &&
                        <p className="error">Password must be at least 10 characters long!</p>
                    }

                    {
                        errors.repass?.maxLength &&
                        <p className="error">Password can't be more than 25 characters long!</p>
                    }

                    {
                        btnDisabled
                            ? <input type="submit" className="submit" value="Register" disabled />
                            : <input type="submit" className="submit" value="Register" />
                    }

                    <p className="auth-paragraph">
                        <span><em>If you already have profile click <Link to="/login">here</Link></em></span>
                    </p>
                </div>
            </form>
        </section>
    );
}