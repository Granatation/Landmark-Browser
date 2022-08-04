import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const add = (landmarkData) =>
    request.post(`${baseUrl}/add-landmark`, landmarkData);

export const getAll = () =>
    request.get(`${baseUrl}/all-landmarks`);

export const getOne = (landmarkId) =>
    request.get(`${baseUrl}/all-landmarks/${landmarkId}`);

export const edit = (landmarkId, landmarkData) =>
    request.post(`${baseUrl}/all-landmarks/${landmarkId}/edit`, landmarkData);

export const del = (landmarkId) =>
    request.get(`${baseUrl}/all-landmarks/${landmarkId}/delete`);

export const visit = (landmarkId) =>
    request.get(`${baseUrl}/all-landmarks/${landmarkId}/visit`);
