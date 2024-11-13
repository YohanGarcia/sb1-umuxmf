import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir el token `access` en cada solicitud
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  console.log(user);
  if (user) {
    const accessToken = JSON.parse(user).access;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor para manejar el error 401 y refrescar el token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = localStorage.getItem('user');
      if (user) {
        const refreshToken = JSON.parse(user).refresh;
        try {
          const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;
          
          // Actualiza `user` en localStorage con el nuevo access token
          const updatedUser = { ...JSON.parse(user), access: newAccessToken };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          // Agrega el nuevo token a la solicitud original y la reintenta
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Manejo de errores si falla la solicitud de refresh
          localStorage.removeItem('user');
          window.location.href = '/login'; // Redirige al usuario al login
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
