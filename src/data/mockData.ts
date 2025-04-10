
import { Restaurant, Category, MenuItem } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Fast Food' },
  { id: '3', name: 'Pizza' },
  { id: '4', name: 'Sushi' },
  { id: '5', name: 'Healthy' },
  { id: '6', name: 'Brazilian' },
  { id: '7', name: 'Italian' },
  { id: '8', name: 'Chinese' },
  { id: '9', name: 'Desserts' },
  { id: '10', name: 'Drinks' },
];

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger King',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Fast Food',
    rating: 4.2,
    deliveryTime: '25-35 min',
    deliveryFee: 'R$7,90',
    minimumOrder: 'R$15,00'
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Pizza',
    rating: 4.5,
    deliveryTime: '30-45 min',
    deliveryFee: 'R$5,90',
    minimumOrder: 'R$20,00'
  },
  {
    id: '3',
    name: 'Sushi Express',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Sushi',
    rating: 4.7,
    deliveryTime: '40-55 min',
    deliveryFee: 'R$8,90',
    minimumOrder: 'R$30,00'
  },
  {
    id: '4',
    name: 'Green Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Healthy',
    rating: 4.3,
    deliveryTime: '20-35 min',
    deliveryFee: 'R$6,90',
    minimumOrder: 'R$18,00'
  },
  {
    id: '5',
    name: 'Feijoada Express',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Brazilian',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 'R$6,90',
    minimumOrder: 'R$25,00'
  },
  {
    id: '6',
    name: 'Pasta Bella',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: '35-50 min',
    deliveryFee: 'R$7,90',
    minimumOrder: 'R$22,00'
  }
];

export const menuItems: MenuItem[] = [
  // Burger King
  {
    id: '101',
    restaurantId: '1',
    name: 'Whopper',
    description: 'Flame-grilled beef patty with tomatoes, lettuce, mayo, pickles, onions, and ketchup on a sesame seed bun.',
    price: 19.9,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Burgers',
    popular: true
  },
  {
    id: '102',
    restaurantId: '1',
    name: 'Chicken Fries',
    description: 'Crispy chicken strips shaped like fries. Perfect for dipping.',
    price: 14.9,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Sides'
  },
  {
    id: '103',
    restaurantId: '1',
    name: 'Onion Rings',
    description: 'Crispy, golden onion rings. A classic side.',
    price: 9.9,
    image: 'https://images.unsplash.com/photo-1639024471283-15c0833d1dff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Sides'
  },
  
  // Pizza Hut
  {
    id: '201',
    restaurantId: '2',
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni pizza with mozzarella cheese and tomato sauce.',
    price: 39.9,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Pizzas',
    popular: true
  },
  {
    id: '202',
    restaurantId: '2',
    name: 'Margherita Pizza',
    description: 'Traditional pizza with tomatoes, mozzarella cheese, and basil.',
    price: 35.9,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Pizzas'
  },
  {
    id: '203',
    restaurantId: '2',
    name: 'Garlic Bread',
    description: 'Warm bread with garlic butter and herbs.',
    price: 12.9,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Sides'
  },
  
  // Sushi Express
  {
    id: '301',
    restaurantId: '3',
    name: 'Salmon Nigiri',
    description: 'Fresh salmon over pressed vinegared rice.',
    price: 24.9,
    image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Nigiri',
    popular: true
  },
  {
    id: '302',
    restaurantId: '3',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber roll with sesame seeds.',
    price: 22.9,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Rolls'
  },
  {
    id: '303',
    restaurantId: '3',
    name: 'Miso Soup',
    description: 'Traditional Japanese soup with tofu, seaweed, and green onions.',
    price: 9.9,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'Soups'
  }
];
