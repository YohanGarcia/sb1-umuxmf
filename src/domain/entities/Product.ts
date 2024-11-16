export interface Imagen {
  id: number;
  imagen: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  fecha_creacion: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;
  fecha_creacion: string;
  fecha_actualizacion: string;
  imagenes: Imagen[];
}

export interface Item {
  id: number;
  cantidad: number;
  precio: string;
  producto: Producto;  // Cambiar a Producto para incluir el nombre y otros detalles
  total_item: number;
}

export interface Orden {
  id: number;
  estado: string;
  fecha_creacion: string;
  total: string;
  items: Item[];
}