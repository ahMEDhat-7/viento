import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  stock_quantity: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface StoreState {
  // Products & Categories
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  
  // Cart
  cartItems: CartItem[];
  isCartOpen: boolean;
  
  // User & Auth
  user: User | null;
  session: any;
  
  // UI State
  isAuthModalOpen: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  // Auth actions
  setUser: (user: User | null) => void;
  setSession: (session: any) => void;
  toggleAuthModal: () => void;
  
  // Computed values
  cartTotal: () => number;
  cartItemsCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      categories: [],
      selectedCategory: null,
      cartItems: [],
      isCartOpen: false,
      user: null,
      session: null,
      isAuthModalOpen: false,
      
      // Actions
      setProducts: (products) => set({ products }),
      setCategories: (categories) => set({ categories }),
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      
      // Cart actions
      addToCart: (product, quantity = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cartItems: [...cartItems, { ...product, quantity }]
          });
        }
      },
      
      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter(item => item.id !== productId)
        });
      },
      
      updateCartItemQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cartItems: get().cartItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ cartItems: [] }),
      toggleCart: () => set(state => ({ isCartOpen: !state.isCartOpen })),
      
      // Auth actions
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      toggleAuthModal: () => set(state => ({ isAuthModalOpen: !state.isAuthModalOpen })),
      
      // Computed values
      cartTotal: () => {
        return get().cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      cartItemsCount: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'viento-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        selectedCategory: state.selectedCategory,
        user: state.user,
        session: state.session,
      }),
    }
  )
);