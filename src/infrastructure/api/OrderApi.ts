import { Order } from '../../domain/entities/Order';
import api from './Api';

export class OrderApi {

  async getUserOrders(): Promise<Order[]> {
    try {
      const response = await api.get(`/orders`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las órdenes del usuario", error);
      throw new Error("No se pudieron obtener las órdenes del usuario.");
    }
  }
}
