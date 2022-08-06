import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Login = () => {
    const navigate = useNavigate();

    const { userLogin, isAuth } = useContext(AuthContext);

    const [hasErrors, setHasErrors] = useState(true);

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [errors, setErrors] = useState({
        email: {},
        password: {}
    });

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
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
    }, [errors])

    useEffect(() => {
        setBtnDisabled(hasErrors ||
            values.email === '' ||
            values.password === '')
    }, [hasErrors, values])


    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = values;

        authService.login(email, password)
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


    return (
        <section id="login" className="form-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Login</h1>
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

                    {
                        btnDisabled
                            ? <input type="submit" className="submit" value="Login" disabled />
                            : <input type="submit" className="submit" value="Login" />
                    }

                    <p className="auth-paragraph-login">
                        <span><em>If you don't have profile click <Link to="/register">here</Link></em></span>
                    </p>
                </div>
            </form>
        </section>
    );
}