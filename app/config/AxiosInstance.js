import axios from 'axios';

const baseURL = 'https://clinic-management-api.onrender.com';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
