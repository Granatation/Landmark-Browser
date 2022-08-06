import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const AllLandmarks = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/all-landmarks/page/1',{ replace: true })
    }, []);

    return null;
}