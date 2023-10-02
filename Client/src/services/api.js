import axios from 'axios'
import errorResponseHandler from './errorResponseHandler'

    let api = axios.create({
        baseURL : "http://localhost:3001/api"
    })

    api.interceptors.response.use((response) => response, errorResponseHandler)

export default api
