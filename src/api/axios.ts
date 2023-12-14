import axios from 'axios'

// https://estore-api-oz4z.onrender.com

const api = axios.create({ baseURL: 'http://localhost:3500/' })

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
