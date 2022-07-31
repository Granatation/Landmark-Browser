import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { auth } = useContext(AuthContext)
    
    return (
        <header>
            <Link className='home' to='/'>Home</Link>
            <nav>

                {auth ? <Link to='/my-profile'>{auth.email}</Link> : ''}
                <Link to='/catalog'>All Destinations</Link>
                {
                    auth
                        ? <>
                            <Link to='/add'>Add Destination</Link>
                            <Link to='/logout'>Logout</Link>
                        </>
                        : <>
                            <Link to='/login'>Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                }



            </nav>
        </header>
    );
}