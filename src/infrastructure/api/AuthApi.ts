import axios from 'axios';
import { User } from '../../domain/entities/User';

const API_URL = 'http://localhost:8000/api';

export class AuthApi {
  async login(username: string, password: string): Promise<User | null> {
    try {
      const response = await axios.post(`${API_URL}/login/  `, { username, password });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async register(user: Omit<User, 'id'>): Promise<User | null> {
    try {
      console.log(user);
      
      const response = await axios.post(`${API_URL}/register/`, user);
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      return null;
    }
  }
}