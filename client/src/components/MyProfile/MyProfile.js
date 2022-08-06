import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";

export const MyProfile = () => {
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);


    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        navigate('/my-profile/page/1', { replace: true });
    }, []);

    return null;
}