import axios, { AxiosInstance } from 'axios';

const URL = process.env.NEXT_PUBLIC_APP_API_URL

class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
}

const http = new Http().instance;

http.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log('Error Response: ', error.response);

        return Promise.reject(error);
    }
);

export { http }