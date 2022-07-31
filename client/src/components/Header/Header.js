import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { user } = useContext(AuthContext)

    return (
        <header>
            <Link className='home' to='/'>Home</Link>
            <nav>

                {user?.email ? <Link to='/my-profile'>{user.email}</Link> : ''}
                <Link to='/catalog'>All Destinations</Link>
                {
                    user?.accessToken
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