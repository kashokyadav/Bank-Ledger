// frontend/src/services/auth.service.js
// this file is responsible for handling authentication-related API requests,
// - such as user registration and login. 
// -It uses the Axios instance defined in api.js to communicate with the backend server.
// it exports two functions: registerUser and loginUser, 
// -which send POST requests to the backend's authentication endpoints.

import api from "./api"

export async function registerUser(userData) {
    const response = await api.post("/auth/register", userData)

    return response.data

}

export async function loginUser(userData) {
    const response = await api.post("/auth/login", userData)  
    
    return response.data
    console.log("Login response:", response.data)

}

export async function logoutUser() {
    const response = await api.post("/auth/logout")
    return response.data
}

export async function getCurrentUser() {
    const response = await api.get("/auth/me")
    return response.data
}