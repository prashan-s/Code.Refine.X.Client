import axios from 'axios';
import store from '@redux/store'; // Import the store to dispatch actions directly
import { setLoading } from '@redux/reducers/loadingReducer'; // Import the loading action

const BASE_URL = process.env.API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to show the spinner before the request is made
axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(setLoading(true)); // Dispatch loading state to true
        return config;
    },
    (error) => {
        store.dispatch(setLoading(false)); // Dispatch loading state to false on error
        return Promise.reject(error);
    }
);

// Response interceptor to hide the spinner after the response is received
axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(setLoading(false)); // Dispatch loading state to false on success
        return response;
    },
    (error) => {
        store.dispatch(setLoading(false)); // Dispatch loading state to false on error
        return Promise.reject(error);
    }
);

export default axiosInstance;
