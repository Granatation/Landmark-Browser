import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password });


export const register = (username, email, password, repass) =>
    request.post(`${baseUrl}/register`, { username, email, password, repass });

export const logout = () => {
    try {
        localStorage.clear();
    } catch (error) {
        return error
    }
}

export const getUserLandmarks = () =>
    request.get(`${baseUrl}/my-profile`);