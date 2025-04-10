
import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, quantity: number) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (menuItem: MenuItem, quantity: number) => {
    setItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item.menuItem.id === menuItem.id);
      
      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${menuItem.name} quantity updated in your cart.`,
          duration: 2000,
        });
        
        return updatedItems;
      } else {
        // If item doesn't exist, add it to the cart
        toast({
          title: "Item added",
          description: `${menuItem.name} added to your cart.`,
          duration: 2000,
        });
        
        return [...prevItems, { menuItem, quantity }];
      }
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.menuItem.id === menuItemId);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.menuItem.name} removed from your cart.`,
          duration: 2000,
        });
      }
      
      return prevItems.filter(item => item.menuItem.id !== menuItemId);
    });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal,
        getItemCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
