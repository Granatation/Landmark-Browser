import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password });


export const register = (email, password, repass) =>
    request.post(`${baseUrl}/register`, { email, password, repass });

export const logout = async (accessToken) => {
    try {

        localStorage.clear();

    } catch (error) {
        console.log(error);
    }
}