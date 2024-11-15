import { Producto } from './Product';

export interface CartItem {
  product: Producto;
  quantity: number;
}