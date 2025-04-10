
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  User, 
  MapPin, 
  Search, 
  Menu as MenuIcon, 
  X,
  Home
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = 0; // This will be dynamic in the future

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-foodish-primary">Foodish</span>
          </Link>

          {/* Location - Hide on mobile */}
          <div className="hidden md:flex items-center text-sm text-gray-600 ml-6">
            <MapPin size={16} className="mr-1 text-foodish-primary" />
            <span>Delivery to: <span className="font-semibold">Current Location</span></span>
          </div>

          {/* Search - Hide on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search for restaurants or foods..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-foodish-primary focus:ring-1 focus:ring-foodish-primary"
              />
            </div>
          </div>

          {/* Navigation Links - Hide on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700 hover:text-foodish-primary transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-foodish-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/profile">
              <User className="text-gray-700 hover:text-foodish-primary transition-colors" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile search - Only visible on mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search restaurants or foods..." 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-foodish-primary focus:ring-1 focus:ring-foodish-primary"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foodish-primary">Foodish</span>
              <button 
                className="text-gray-700 focus:outline-none"
                onClick={toggleMenu}
              >
                <X />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-6">
              <Link 
                to="/"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
              <Link 
                to="/restaurants"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <MapPin size={20} />
                <span className="font-medium">Restaurants</span>
              </Link>
              <Link 
                to="/cart"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <ShoppingCart size={20} />
                <span className="font-medium">Cart</span>
              </Link>
              <Link 
                to="/profile"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <User size={20} />
                <span className="font-medium">Profile</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
