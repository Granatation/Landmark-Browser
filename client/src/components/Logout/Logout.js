import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import * as authService from '../../services/authService';

export const Logout = () => {
    const navigate = useNavigate();
    const { userLogout, isAuth } = useContext(AuthContext);

    useEffect(() => { 
        if (!isAuth) {
            return navigate('/404');
        }

        try {
           authService.logout(); 
           userLogout();
           navigate('/')
        } catch (error) {
            alert(error)
        }
    });

    return null;
}