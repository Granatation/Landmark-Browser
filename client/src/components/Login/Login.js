import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Login = () => {

    const { userLogin, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            return navigate('/404');
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.target));

        authService.login(email, password)
            .then(result => {
                userLogin(result)
                if (result) navigate('/');
            })
            .catch(error => alert(error.message))
    }

    return (
        <section id="login" className="form-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <input type="submit" className="submit" value="Login" />
                    <p className="auth-paragraph">
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}