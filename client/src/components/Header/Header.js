import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <Link className='home' to='/'>Home</Link>
            <nav>
                <Link to='/catalog'>All landscapes</Link>
                <Link to='/add'>Add Landscape</Link>
                <Link to='/logout'>Logout</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
        </header>
    );
}