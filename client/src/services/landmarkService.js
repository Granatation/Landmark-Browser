import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const add = (landmarkData) =>
    request.post(`${baseUrl}/add-landmark`, landmarkData);

export const getAll = () =>
    request.get(`${baseUrl}/all-landmarks`);

export const getOne = (landmarkId) =>
    request.get(`${baseUrl}/all-landmarks/${landmarkId}`);
