import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as landmarkService from '../../../services/landmarkService';

export const Visit = () => {
    const navigate = useNavigate();
    const { landmarkId } = useParams();
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuth) {
            return navigate('/404');
        }

        landmarkService.visit(landmarkId)
            .then(() => {
                navigate(`/all-landmarks/${landmarkId}`,{ replace: true });
            })
            .catch(error => alert(error))
    });

    return null;
}