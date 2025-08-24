import axios from 'axios'

const API_URL = 'http://localhost:5000'

const apiCaller = {
    createUser: async (userData: any) => {
        try {
            const response = await axios.post(`${API_URL}/users`, userData)
            return response.data
        } catch (error) {
            console.error('Failed to create user:', error)
            throw error
        }
    },
}

export default apiCaller
