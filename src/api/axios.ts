import axios from 'axios'

const api = axios.create({ baseURL: `https://estore-api-oz4z.onrender.com/` })

export default api

export const EndPoints = {
  sales: `sales`,
  products: `products`,
  events: `events`,
  login: `login`,
  register: `register`,
  users: `users`,
  usersDb: `users-db`
}
