import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const MyProfile = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/my-profile/page/1',  { replace: true })
    }, []);

    return null;
}