import { create } from "zustand";
import { CartItem } from "../../domain/entities/CartItem";
import toast from "react-hot-toast";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {

      const existingItem = state.items.find(
        (i) => i.product.id === item.product.id
      );

      // Verificar stock disponible
      const totalQuantity = existingItem
        ? existingItem.quantity + item.quantity
        : item.quantity;
      if (totalQuantity > item.product.stock) {
        toast.error("No hay suficiente stock disponible");
        return state; // No actualizar el estado
      }

      if (existingItem) {
        console.log("Actualizando cantidad para:", item.product);
        return {
          items: state.items.map((i) =>
            i.product.id === item.product.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: item.quantity || 1 }],
      };
    }),

  removeItem: (productId: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  updateQuantity: (id, quantity) =>
    set((state) => {
      const product = state.items.find((i) => i.product.id === id)?.product;
      if (product && quantity > product.stock) {
        toast.error("No puedes añadir más de lo que hay en stock");
        return state; // No actualizar el estado
      }
      return {
        items: state.items.map((i) =>
          i.product.id === id ? { ...i, quantity } : i
        ),
      };
    }),
  clearCart: () => set({ items: [] }),
  increaseQuantity: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { 
              ...item, 
              quantity: 
              item.quantity < item.product.stock
                ? item.quantity + 1
                : item.product.stock
              }
          : item
      ),
    })),
  decreaseQuantity: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
