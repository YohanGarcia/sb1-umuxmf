import axios from 'axios';
import { Producto } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

const API_URL = import.meta.env.VITE_API_URL;

export class ProductApi implements ProductRepository {
  async getAll(): Promise<Producto[]> {
    const response = await axios.get(`${API_URL}/productos/`);
    return response.data;
  }

  async getById(id: string): Promise<Producto | null> {
    try {
      const response = await axios.get(`${API_URL}/productos/${id}/`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
        }
        throw error;
    }
  }

  async search(query: string): Promise<Producto[]> {
    const response = await axios.get(`${API_URL}/productos/`);
    return response.data.filter((product: Producto) =>
      product.nombre.toLowerCase().includes(query.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(query.toLowerCase())
    );
  }

  async add(product: FormData): Promise<void> {
    console.log(product.getAll('categoria'));
    
    await axios.post(`${API_URL}/productos/`, product);
  }

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/productos/${id}/`);
  }
}