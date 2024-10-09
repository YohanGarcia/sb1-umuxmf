import { Product } from '../entities/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  search(query: string): Promise<Product[]>;
}