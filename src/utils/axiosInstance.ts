import axios from 'axios';
import store from '@redux/store'; // Import the store to dispatch actions directly
import { setLoading } from '@redux/reducers/loadingReducer'; // Import the loading action
import { showToast } from './toastService';

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

        // Check if the response contains a success message and show success toast
        const successMessage = response.data?.Message || response.data?.message || null;
        if (successMessage) {
            showToast('success', 'Success', successMessage); // Show success toast
        }

        return response;
    },
    (error) => {
        store.dispatch(setLoading(false)); // Dispatch loading state to false on error

        // Extract error message from the response and show the toast
        const errorMessage = error.response?.data?.Message || error.response?.data?.message || 'An error occurred';
        showToast('error', 'Error', errorMessage);

        return Promise.reject(error);
    }
);

export default axiosInstance;
