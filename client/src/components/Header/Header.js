import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <Link className='home' to='/'>Home</Link>
            <nav>
                <Link to='/catalog'>All Destinations</Link>
                <Link to='/add'>Add Destination</Link>
                <Link to='/logout'>Logout</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
        </header>
    );
}