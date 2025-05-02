import axios from 'axios';
let apiUrl = '';

const environment = import.meta.env.VITE_ENV;
apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create();

instance.defaults.baseURL = apiUrl;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const setAxiosBaseURL = (url: string) => {
  instance.defaults.baseURL = url;
};

export default instance;
