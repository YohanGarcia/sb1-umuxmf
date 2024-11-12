export interface Order {
    id: string;
    userId: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];
  }