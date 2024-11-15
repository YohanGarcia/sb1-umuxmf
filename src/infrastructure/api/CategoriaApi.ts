// obtener todos los productos de una categoría
import { Categoria } from '../../domain/entities/Product';
import api from './Api';

export class CategoriaApi {
  async getAll(): Promise<Categoria[]> {
    const response = await api.get(`/categorias/`);
    return response.data;
  }

  async getById(id: string): Promise<Categoria | null> {
    try {
      const response = await api.get(`/categorias/${id}/`);
      return response.data;
    } catch (error) {
        console.error("Error al obtener la categoría", error);
        return null;
    }
  }

  async add(categoria: Omit<Categoria, 'id'>): Promise<void> {
    try {
      await api.post(`/categorias/`, categoria);
    } catch (error) {
      console.error("Error al agregar la categoría", error);
      throw error;
    }
  }
}