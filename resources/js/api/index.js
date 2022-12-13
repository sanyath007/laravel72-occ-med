import axios from 'axios'

const api = axios.create({
    baseURL: process.env.MIX_APP_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    // const token = localStorage.getItem('access_token')
    // console.log(token);

    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }

    return config
}, (error) => Promise.reject(error))

api.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.status === 401) {
        console.log('Unauthorized!');

        localStorage.removeItem('user')
    } else {
        return Promise.reject(err)
    }
})

export default api
