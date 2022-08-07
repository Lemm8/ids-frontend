import { axiosPrivate } from "./api";

export const login = async ( correo, contrasena ) => {
    try {
        const response = await axiosPrivate.post(`/auth/login`, { 
            correo,
            contrasena,
        });
        return {
            success: true,
            res: response
        }
    } catch (error) {
        return {
            success: false,
            res: error.response.data
        };
    }
}

export const getRefreshToken = async () => {
    try {
        const response = await axiosPrivate.get(`/refresh`, {
            withCredentials: true
        });
        return {
            success: true,
            res: response
        }
    } catch (error) {
        return {
            success: false,
            res: error.response.data
        };
    }
}