import axios from 'axios';
const BASE_URL = 'https://ids-production.up.railway.app/api' // prod
// const BASE_URL = 'http://localhost:3301/api' // dev

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

