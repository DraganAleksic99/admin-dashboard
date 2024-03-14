import axios from 'axios'

const api = axios.create({
  baseURL: 'https://admin-dashboard-backend-production-d88e.up.railway.app/'
})

export const EndPoints = {
  sales: `sales`,
  products: `products`,
  events: `events`,
  login: `login`,
  register: `register`,
  users: `users`
}

export default api
