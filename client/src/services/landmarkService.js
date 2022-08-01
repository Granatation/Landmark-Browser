import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const add = (landmarkData) =>
    request.post(`${baseUrl}/add-landmark`, landmarkData);
    // fetch(`${baseUrl}/add-landmark`, {
    //     method:'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(landmarkData)
    // })
    