import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api/v1`
});

axiosClient.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        } else {
            
            console.error('Access token not available');
        }
        return config;
    },
   
);

export default axiosClient;

