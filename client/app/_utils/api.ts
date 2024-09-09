import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            localStorage.removeItem('token');
            // window.location.href = '/'
        }
        return Promise.reject(err);
    }
);

export default api;
