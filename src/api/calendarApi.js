import axios from 'axios'
import { getEnvVariables } from '../helpers'

const { VITE_APP_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_APP_API_URL
})

export default calendarApi
