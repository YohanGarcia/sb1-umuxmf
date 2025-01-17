import { OrderItem } from "./OrderItem";

export interface Order {
  id: number;
  date: string;  // Fecha de la orden, como string (ISO 8601)
  total: number; // Total de la orden
  status: string; // Estado de la orden, por ejemplo "pendiente", "completada", etc.
  // Agrega más campos según sea necesario
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
