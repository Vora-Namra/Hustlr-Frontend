import axios from 'axios';
import { removeUser } from '../Slices/UserSlice';
import { removeJwt } from '../Slices/JwtSlice';

const axiosInstance = axios.create({
    baseURL: 'https://hustlr-backend.onrender.com',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

interface SetupResponseInterceptorParams {
  dispatch: (action: any) => void;
  navigate: (path: string) => void;
}

export const setupResponseInterceptor = ({ dispatch, navigate }: SetupResponseInterceptorParams): void => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        dispatch(removeUser());
        dispatch(removeJwt());
        localStorage.clear();
        navigate('/login');
      }
      return Promise.reject(err);
    }
  );
};

export default axiosInstance;