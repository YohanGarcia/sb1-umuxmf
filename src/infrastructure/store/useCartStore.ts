import { create } from 'zustand';
import { CartItem } from '../../domain/entities/CartItem';
import { Product } from '../../domain/entities/Product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { items: [...state.items, { product, quantity: 1 }] };
      }
    });
  },
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));