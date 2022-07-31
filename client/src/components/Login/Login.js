import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <section id="login" className="form-section">
            <form>
                <div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="email" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <input type="submit" className="submit" value="Login" />
                    <p>
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}