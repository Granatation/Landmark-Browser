import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import * as landmarkService from '../../../services/landmarkService';

export const Delete = () => {
    const navigate = useNavigate();
    const { landmarkId } = useParams();
    const { isAuth } = useContext(AuthContext)

    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

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