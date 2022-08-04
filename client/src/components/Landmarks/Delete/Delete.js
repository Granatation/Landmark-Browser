import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as landmarkService from '../../../services/landmarkService';

export const Delete = () => {
    const navigate = useNavigate();
    const { landmarkId } = useParams();

    useEffect(() => { 
        landmarkService.del(landmarkId)
            .then(() => {
                navigate('/all-landmarks')
            })
            .catch(() => {
                navigate('/all-landmarks')
            })
    });

    return null;
}