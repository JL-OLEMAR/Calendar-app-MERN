import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_APP_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_APP_API_URL
})

// Intercepts all routes that have the token
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': window.localStorage.getItem('token')
  }
  return config
})

export default calendarApi
