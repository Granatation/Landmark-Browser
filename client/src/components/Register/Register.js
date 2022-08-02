import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Register = () => {
    const { userLogin, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            return navigate('/404');
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const { username, email, password, repass } = Object.fromEntries(new FormData(e.target));

        authService.register(username, email, password, repass)
            .then(result => {
                userLogin(result)
                if (result) navigate('/');
            })
            .catch(error => alert(error.message))
    }

    return (
        <section id="register" className="form-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Register</h1>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="someone" />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email@sth.com" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="**********" />

                    <label htmlFor="repass">Repeat password:</label>
                    <input type="password" id="repass" name="repass" placeholder="**********" />

                    <input type="submit" className="submit" value="Register" />
                    <p className="auth-paragraph">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}