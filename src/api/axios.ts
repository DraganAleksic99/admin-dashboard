import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3500/' })

export const EndPoints = {
  sales: `sales`,
  products: `products`,
  events: `events`,
  login: `login`,
  register: `register`,
  users: `users`,
  usersDb: `users-db`
}

export default api
