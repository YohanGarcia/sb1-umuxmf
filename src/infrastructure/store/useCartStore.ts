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

export const useCartStore = create<CartStore>((set, get) => {
  // Cargar los datos del carrito desde localStorage al inicializar
  const loadCartFromLocalStorage = (): CartItem[] => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  return {
    items: loadCartFromLocalStorage(),

    addItem: (item) =>
      set((state) => {
        const existingItem = state.items.find(
          (i) => i.product.id === item.product.id
        );

        const totalQuantity = existingItem
          ? existingItem.quantity + item.quantity
          : item.quantity;

        if (totalQuantity > item.product.stock) {
          toast.error("No hay suficiente stock disponible");
          return state;
        }

        const updatedItems = existingItem
          ? state.items.map((i) =>
              i.product.id === item.product.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          : [...state.items, { ...item, quantity: item.quantity || 1 }];

        // Guardar en localStorage
        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
      }),

    removeItem: (productId: number) => {
      set((state) => {
        const updatedItems = state.items.filter(
          (item) => item.product.id !== productId
        );

        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
      });
    },

    updateQuantity: (id, quantity) =>
      set((state) => {
        const product = state.items.find((i) => i.product.id === id)?.product;
        if (product && quantity > product.stock) {
          toast.error("No puedes añadir más de lo que hay en stock");
          return state;
        }

        const updatedItems = state.items.map((i) =>
          i.product.id === id ? { ...i, quantity } : i
        );

        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
      }),

    clearCart: () => {
      localStorage.removeItem("cart");
      set({ items: [] });
    },

    increaseQuantity: (productId) =>
      set((state) => {
        const updatedItems = state.items.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity < item.product.stock
                    ? item.quantity + 1
                    : item.product.stock,
              }
            : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
      }),

    decreaseQuantity: (productId) =>
      set((state) => {
        const updatedItems = state.items.map((item) =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
      }),

    getTotalItems: () => {
      return get().items.reduce((total, item) => total + item.quantity, 0);
    },
  };
});
