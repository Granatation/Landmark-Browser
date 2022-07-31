import { Link } from "react-router-dom";

export const Register = () => {

    const onSubmit = (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target))
        console.log(data);

        fetch('http://localhost:3030/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
            .catch(error => console.log(error))
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