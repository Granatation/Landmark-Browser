import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header>
            <Link className='home' to='/'>Home</Link>
            <nav>

                {user?.accessToken ? <Link to='/my-profile'>{user.username}</Link> : ''}
                <Link to='/all-landmarks'>All Landmarks</Link>
                {
                    user?.accessToken
                        ? <>
                            <Link to='/add-landmark'>Add Landmark</Link>
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