import axios from "axios";


const API_URL = 'http://localhost:8000/api'
const apiClient = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
class ApiService {
    static async isUserLoggedIn() {
        try {

        } catch (e) {
            console.error(e)
        }
    }
}

export default api;