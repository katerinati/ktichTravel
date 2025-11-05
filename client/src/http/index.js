import axios from "axios";
import auth from "../store/auth.js";


const API_URL = 'http://localhost:8000/api'
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use( (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config;
})

$api.interceptors.response.use((config) => {
    return config;

},async (err) => {
    if(err.response.status === 401) {
            auth.handleUnauthorised()
    }
})

export default $api;