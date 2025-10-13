import axios from "axios";
import auth from "../store/auth.js";


const API_URL = 'http://localhost:8000/api'
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use( (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        // config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjYW5kaWJuYnRlc3RAbWFpbC5ydSIsImlkIjoiNjhlOTEyOGU0MjVlNWJjMDBkYjM0ODgzIiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE3NjAxMDU2ODUsImV4cCI6MTc2MDEwNTk4NX0.vvvNCsKebsGSJer4eR34_tuyZ2LYaIoaFq8_j9LF2MQ"
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