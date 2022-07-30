import { Link } from "react-router-dom";

export const Register = () => {
    return (
        <section id="register" className="form-section">
            <form>
                <div>
                    <h1>Register</h1>
                    <label htmlFor="username">Username:</label>
                    <input type="username" id="username" name="username" placeholder="username" />

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