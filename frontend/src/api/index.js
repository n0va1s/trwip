import axios from 'axios'
import userHelper from '../helpers/user'

var api = axios.create({
  baseURL: '/api',
  headers: userHelper.getAuthHeader()
})

export default api
