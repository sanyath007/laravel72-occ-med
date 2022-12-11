import axios from 'axios'

const api = axios.create({
    baseURL: process.env.MIX_APP_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    console.log(token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
}, (error) => Promise.reject(error))

export default api
