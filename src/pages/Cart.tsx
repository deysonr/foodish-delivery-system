
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { restaurants } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Group items by restaurant
  const itemsByRestaurant = items.reduce((acc, item) => {
    const { restaurantId } = item.menuItem;
    if (!acc[restaurantId]) {
      acc[restaurantId] = [];
    }
    acc[restaurantId].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const handleCheckout = () => {
    // In a real app, you would:
    // 1. Save the order to the database
    // 2. Process payment
    // 3. Navigate to an order confirmation page
    
    setIsCheckingOut(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your food is being prepared and will be delivered soon.",
        duration: 5000,
      });
      
      clearCart();
      navigate('/profile');
      setIsCheckingOut(false);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 mb-6 hover:text-foodish-primary">
          <ChevronLeft size={20} />
          <span>Back to Restaurants</span>
        </Link>
        
        <div className="text-center py-10">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-foodish-light rounded-full">
            <AlertCircle size={40} className="text-foodish-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-foodish-primary hover:bg-foodish-primary/90"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  const deliveryFee = 7.9; // Fixed for simplicity
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-gray-600 mb-6 hover:text-foodish-primary">
        <ChevronLeft size={20} />
        <span>Back to Restaurants</span>
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        
        return (
          <div key={restaurantId} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">{restaurant?.name}</h2>
              <Link 
                to={`/restaurant/${restaurantId}`}
                className="text-foodish-primary text-sm font-medium"
              >
                Add more items
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
              {restaurantItems.map((item) => (
                <div key={item.menuItem.id} className="p-4 border-b last:border-b-0">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.menuItem.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            R${item.menuItem.price.toFixed(2).replace('.', ',')}
                          </p>
                          {item.specialInstructions && (
                            <p className="text-xs text-gray-500 mt-1">
                              Note: {item.specialInstructions}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-5 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <span className="font-medium mr-4">
                        R${(item.menuItem.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.menuItem.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="font-bold text-lg mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>R${subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span>R${deliveryFee.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>R${total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
        
        <Alert className="mb-4 bg-blue-50 text-blue-800 border-blue-200">
          <AlertDescription className="flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
            <span>For this demo, we'll simulate a successful order without actual payment or delivery.</span>
          </AlertDescription>
        </Alert>
        
        <Button 
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="w-full bg-foodish-primary hover:bg-foodish-primary/90"
        >
          {isCheckingOut ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
