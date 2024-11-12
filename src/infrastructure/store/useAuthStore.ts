import { create } from 'zustand';
import { User } from '../../domain/entities/User';
import { AuthApi } from '../api/AuthApi';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (user: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}



export const useAuthStore = create<AuthState>((set) => {
  const authApi = new AuthApi();

  // Cargar usuario desde localStorage al iniciar
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  return {
    user: null,
    isAuthenticated: false, 
    isLoading: false,
    error: null,

    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      console.log(username, password);
      try {
        const user = await authApi.login(username, password);
        console.log(user);
        
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } else {
          set({ error: 'Credenciales inválidas', isLoading: false });
          return false;
        }
      } catch (error) {
        set({ error: 'Error al iniciar sesión', isLoading: false });
        return false;
      }
    },

    register: async (userData: Omit<User, 'id'>) => {
      set({ isLoading: true, error: null });
      try {
        const user = await authApi.register(userData);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } else {
          set({ error: 'Error al registrar usuario', isLoading: false });
          return false;
        }
      } catch (error) {
        set({ error: 'Error en el registro', isLoading: false });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem("user");
      set({ user: null, isAuthenticated: false });
    },

    clearError: () => {
      set({ error: null });
    }
  };
});