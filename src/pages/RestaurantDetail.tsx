
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, ChevronLeft, Info, Plus, Minus } from 'lucide-react';
import { restaurants, menuItems } from '@/data/mockData';
import { MenuItem as MenuItemType, Restaurant } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundRestaurant = restaurants.find(r => r.id === id);
      const restaurantMenu = menuItems.filter(item => item.restaurantId === id);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(restaurantMenu.map(item => item.category)));
      
      setRestaurant(foundRestaurant || null);
      setMenu(restaurantMenu);
      setCategories(uniqueCategories);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity);
      setIsModalOpen(false);
      setQuantity(1);
      setSpecialInstructions('');
    }
  };

  const openItemModal = (item: MenuItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading restaurant details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center text-gray-600 mb-4 hover:text-foodish-primary">
        <ChevronLeft size={20} />
        <span>Back to Restaurants</span>
      </Link>

      {/* Restaurant Header */}
      <div className="relative h-48 md:h-64 mb-4 rounded-xl overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{restaurant.name}</h1>
          <p className="mb-2">{restaurant.cuisine}</p>
          <div className="flex flex-wrap items-center text-sm gap-3">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div>
              Delivery: {restaurant.deliveryFee}
            </div>
            <div>
              Min: {restaurant.minimumOrder}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="mb-8">
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menu
                .filter(item => item.category === category)
                .map((item) => (
                  <div 
                    key={item.id} 
                    className="food-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md flex cursor-pointer"
                    onClick={() => openItemModal(item)}
                  >
                    <div className="flex-1 p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.description}</p>
                      <div className="font-medium text-foodish-primary">
                        R${item.price.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>
              {selectedItem?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div>
              <div className="mb-4 h-48 overflow-hidden rounded-md">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mb-6">
                <p className="text-xl font-bold text-foodish-primary mb-4">
                  R${selectedItem.price.toFixed(2).replace('.', ',')}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-6 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block font-medium mb-2">Special Instructions</label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-20 resize-none"
                    placeholder="Any special requests for this item?"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-foodish-primary hover:bg-foodish-primary/90"
                >
                  Add to Cart - R${(selectedItem.price * quantity).toFixed(2).replace('.', ',')}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDetail;
