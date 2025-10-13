


export default class ApiService {
    static async isUserLoggedIn() {
        try {
            const res = await apiClient.get('/users/current')
            return res.data
        } catch (e) {
            console.error(e)
        }
    }
}
