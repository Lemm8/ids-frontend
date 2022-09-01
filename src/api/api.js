import axios from 'axios';
//const BASE_URL = 'https://ids-backend.herokuapp.com/api' // prod
const BASE_URL = 'http://localhost:3301/api' // dev

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

