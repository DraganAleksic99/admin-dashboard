import axios from "axios";

const jsonUrl = "https://my-json-server.typicode.com"
const gitHubUrl = "DraganAleksic99/app2"
const api = axios.create({baseURL: `${jsonUrl}/${gitHubUrl}/`})

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