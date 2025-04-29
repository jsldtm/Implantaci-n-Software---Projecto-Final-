import axios from 'axios';
import Config from '../config';

// Create an Axios instance
const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000, // Set a timeout of 5 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Ensure the Accept header is set globally
    },
});

// Create a request interceptor
api.interceptors.request.use(
    (config: any) => {
        // Add any custom logic before the request is sent
        const newConfig = { ...config };

        newConfig.headers['Authorization'] = `Bearer ${
        process.env.NEXT_PUBLIC_MOVIE_API_KEY // Use the API key from environment variables
        }`; // Add the API key to the headers
        
        return newConfig; // Return the modified config
    },
    (error: any) => {
        // Handle request error
        console.error('Request error:', error); // Log the error to the console
        return Promise.reject(error);
    }
);

// Create a response interceptor
api.interceptors.response.use(
    // Handle successful responses
    (response: any) => response, // Pass through successful responses
    (error: { response: any; message: any; }) => {
        // Handle response error
        console.error('Response error:', error.response || error.message); // Log the error to the console
        return Promise.reject(error);
    }
);

export default api; // Export the Axios instance for use in other parts of the application
