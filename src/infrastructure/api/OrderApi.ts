import { Order } from '../../domain/entities/Order';

export class OrderApi {
  private orders: Order[] = [
    {
      id: '1',
      userId: '1',
      date: '2024-03-15T10:30:00Z',
      total: 799.98,
      status: 'shipped',
      items: [
        { productId: '1', quantity: 1, price: 599.99 },
        { productId: '3', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: '2',
      userId: '1',
      date: '2024-03-20T14:45:00Z',
      total: 1299.99,
      status: 'processing',
      items: [
        { productId: '2', quantity: 1, price: 1299.99 }
      ]
    }
  ];

  async getUserOrders(userId: string = '1'): Promise<Order[]> {
    // En una implementación real, filtrarías por el userId del usuario autenticado
    return this.orders.filter(order => order.userId === userId);
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return this.orders.find(order => order.id === orderId) || null;
  }
}