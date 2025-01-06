import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// funcion para redirigir al usuario al login
const redirectToLogin = () => {
  localStorage.removeItem("user");
  toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
  window.location.href = "/login";
};

// Interceptor para añadir el token `access` en cada solicitud
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        const accessToken = parsedUser.access;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        localStorage.removeItem("user");
      }
    }
    // Asegurar el envío de Content-Type si es necesario
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar el error 401 y refrescar el token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const user = localStorage.getItem("user");
      if (user) {
        const refreshToken = JSON.parse(user).refresh;
        try {
          const response = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;

          // Actualiza `user` en localStorage con el nuevo access token
          const updatedUser = { ...JSON.parse(user), access: newAccessToken };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Agrega el nuevo token a la solicitud original y la reintenta
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Error al actualizar el token de acceso:", refreshError);
          redirectToLogin();

          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
