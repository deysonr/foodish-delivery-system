
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { categories, restaurants } from '@/data/mockData';
import { Restaurant, Category } from '@/types';
import { cn } from '@/lib/utils';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1'); // Default to "All"
  
  const filteredRestaurants = selectedCategory === '1'
    ? restaurants
    : restaurants.filter(restaurant => 
        restaurant.cuisine === categories.find(cat => cat.id === selectedCategory)?.name
      );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Banner */}
      <div className="rounded-xl bg-gradient-to-r from-foodish-primary to-foodish-secondary p-6 text-white mb-8">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-2">Hungry? We got you covered</h1>
          <p className="mb-4">Order food from the best restaurants in your area</p>
          <div className="flex items-center mt-2">
            <Link 
              to="/restaurants" 
              className="bg-white text-foodish-primary px-4 py-2 rounded-full font-medium flex items-center hover:bg-foodish-light transition-colors"
            >
              Browse Restaurants
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Categories</h2>
          <Link to="/categories" className="text-foodish-primary flex items-center text-sm font-medium">
            See All 
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-2 -mx-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex-shrink-0 mx-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === category.id
                  ? "bg-foodish-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {selectedCategory === '1' 
            ? 'Popular Restaurants' 
            : `${categories.find(cat => cat.id === selectedCategory)?.name} Restaurants`
          }
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link 
              key={restaurant.id} 
              to={`/restaurant/${restaurant.id}`}
              className="restaurant-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1" fill="currentColor" />
                    <span className="font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="text-gray-600">
                    {restaurant.deliveryFee}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
