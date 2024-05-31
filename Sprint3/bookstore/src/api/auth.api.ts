import { httpClient } from "./http";
import {SignupProps} from "../pages/Signup"

export const signup = async(userData: SignupProps) => {
    const response = await httpClient.post("/users/join",
        userData);
        return response.data;
}

export const resetRequest = async (data : SignupProps) => {
    const response = await httpClient.post("/users/reset", data);
    return response.data;
}

export const resetPassword = async (data : SignupProps) => {
    const response = await httpClient.put("/users/reset", data);
    return response.data;
}

interface LoginResponse {
    token : string
}

export const login = async (data : SignupProps) => {
    const response = await httpClient.post("/users/login", data);
    return response.data;
}