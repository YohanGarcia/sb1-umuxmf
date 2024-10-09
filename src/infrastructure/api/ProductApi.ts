import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class ProductApi implements ProductRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Smartphone XYZ',
      description: 'Un smartphone de última generación con cámara de alta resolución y batería de larga duración.',
      price: 599.99,
      category: 'Smartphones',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Laptop Pro',
      description: 'Potente laptop para profesionales con procesador de última generación y pantalla de alta resolución.',
      price: 1299.99,
      category: 'Laptops',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      name: 'Auriculares Inalámbricos',
      description: 'Auriculares con cancelación de ruido y sonido de alta fidelidad para una experiencia inmersiva.',
      price: 199.99,
      category: 'Audio',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      name: 'Smartwatch Fitness',
      description: 'Reloj inteligente con múltiples funciones de seguimiento de actividad física y notificaciones.',
      price: 249.99,
      category: 'Wearables',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '5',
      name: 'Tablet Ultra',
      description: 'Tablet de alta gama con pantalla retina y lápiz digital incluido para mayor productividad.',
      price: 699.99,
      category: 'Tablets',
      imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '6',
      name: 'Cámara DSLR Pro',
      description: 'Cámara profesional con sensor de alta resolución y grabación de video 4K.',
      price: 1499.99,
      category: 'Cámaras',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '7',
      name: 'Consola de Videojuegos NextGen',
      description: 'La última consola de videojuegos con gráficos de alta definición y carga ultrarrápida.',
      price: 499.99,
      category: 'Gaming',
      imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '8',
      name: 'Altavoz Inteligente',
      description: 'Altavoz con asistente virtual integrado y sonido envolvente de alta calidad.',
      price: 129.99,
      category: 'Audio',
      imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '9',
      name: 'Monitor Curvo Gaming',
      description: 'Monitor curvo de 34 pulgadas con alta tasa de refresco para una experiencia de juego inmersiva.',
      price: 599.99,
      category: 'Monitores',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '10',
      name: 'Drone 4K',
      description: 'Drone con cámara 4K estabilizada y 30 minutos de tiempo de vuelo.',
      price: 799.99,
      category: 'Drones',
      imageUrl: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    }
  ];

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: string): Promise<Product | null> {
    return this.products.find(product => product.id === id) || null;
  }

  async search(query: string): Promise<Product[]> {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }
}