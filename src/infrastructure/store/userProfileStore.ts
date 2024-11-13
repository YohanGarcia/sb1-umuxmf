import { create } from 'zustand';
import { User } from '../../domain/entities/User';
import { AuthApi } from '../api/AuthApi';

interface UserProfileState {
  userProfile: User | null;
  isLoading: boolean;
  error: string | null;
  fecthUserProfile: () => Promise<void>;
}

export const userProfileStore = create<UserProfileState>((set) => {
  const authApi = new AuthApi();

  return {
    userProfile: null,
    isLoading: false,
    error: null,

    fecthUserProfile: async () => {
      set({ isLoading: true, error: null });
      try {
        const userProfile = await authApi.getCurrentUser();
        console.log(userProfile);
        set({ userProfile, isLoading: false });
      } catch (error) {
        set({ error: 'Error al iniciar sesión', isLoading: false });
      }
    }
  }
})