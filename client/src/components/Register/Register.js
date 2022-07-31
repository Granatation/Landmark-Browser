import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {email,password,repass} = Object.fromEntries(new FormData(e.target)); 

        authService.register(email,password,repass)
            .then(result => {
                userLogin(result)
                navigate('/');
            })
            .catch(error => alert(error.message))
    }

    return (
        <section id="register" className="form-section">
            <form onSubmit={onSubmit}>
                <div>
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <label htmlFor="repass">Repeat password:</label>
                    <input type="password" id="repass" name="repass" />

                    <input type="submit" className="submit" value="Register" />
                    <p>
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}