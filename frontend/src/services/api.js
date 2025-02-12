import axios from 'axios';

const API = axios.create({
    baseURL: 'https://to-do-list-1-7a9c.onrender.com', // Base URL for API
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Set token in request header
    }
    return req; // Return request object
}, (error) => {
    return Promise.reject(error); // Return request error
});

export default API;
