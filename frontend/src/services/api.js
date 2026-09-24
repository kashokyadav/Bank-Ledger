// frontend/src/services/api.js
// This file is responsible for creating an Axios instance with a base URL and
//  -default configuration for making API requests to the backend server.
//  this file use to connect the backend
// cross-origin resource sharing (CORS) is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page.
//  In this case, the frontend is running on http://localhost:5173, and the backend is running on http://localhost:3000.
//  By setting withCredentials to true, the frontend is allowed to send cookies along with requests to the backend, enabling session management and authentication.

import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

export default api