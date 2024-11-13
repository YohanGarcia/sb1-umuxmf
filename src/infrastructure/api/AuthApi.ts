import api from './Api';
import { User } from '../../domain/entities/User';

const API_URL = import.meta.env.VITE_API_URL;

export class AuthApi {
  async login(username: string, password: string): Promise<User | null> {
    try {
      const response = await api.post(`/login/`, { username, password });
      const user = response.data;

      // Almacena el usuario con tokens en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return null;
    }
  }

  async register(user: Omit<User, 'id'>): Promise<User | null> {
    try {
      const response = await api.post(`${API_URL}/register/`, user);
      return response.data;
    } catch (error) {
      console.error('Error al registrarse:', error);
      return null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get(`/profile/`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      return null;
    }
  }
}
