import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Logout = () => {
    const navigate = useNavigate();
    const { user, userLogout, isAuth } = useContext(AuthContext);

    useEffect(() => { 
        if (!isAuth) {
            return navigate('/404');
        }

        authService.logout(user.accessToken)
            .then(() => {
                userLogout()
                navigate('/')
            })
            .catch(() => {
                navigate('/')
            })
    });

    return null;
}