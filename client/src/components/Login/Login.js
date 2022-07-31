import { Link } from "react-router-dom";

export const Login = () => {

    const onSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target))

        fetch('http://localhost:3030/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res =>res.json())
            .then(result => {
                if(result.message){
                    throw Error(result.message)
                }
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
                    <p>
                        <span>If you don't have profile click <Link to="/register">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}