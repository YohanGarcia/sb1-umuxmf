export interface Product {
  id: string;
  nombre: string;
  description: string;
  precio: number;
  categoria: Category;
  imagenes: Imagen[]
}

export interface Category {
  id: string;
  nombre: string;
}

export interface Imagen {
  id: string;
  imagen: string;
}