import axios from "axios";

const jsonUrl = "https://my-json-server.typicode.com"
const gitHubUrl = "DraganAleksic99/app2"
const api = axios.create({baseURL: 'http://localhost:5000'})

export default api

export const EndPoints = {
    sales: `${jsonUrl}/${gitHubUrl}/sales`,
    products: `${jsonUrl}/${gitHubUrl}/products`,
    events: `${jsonUrl}/${gitHubUrl}/events`,
    login: `${jsonUrl}/${gitHubUrl}/login`,
    register: `${jsonUrl}/${gitHubUrl}/register`,
    users: `${jsonUrl}/${gitHubUrl}/users`,
    usersDb: `${jsonUrl}/${gitHubUrl}/users-db`
}