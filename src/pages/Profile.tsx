
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, User, MapPin, ClipboardList, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { toast } = useToast();
  
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+55 11 98765-4321',
  });
  
  const [orders] = useState([
    { 
      id: 'ORD123456', 
      date: '2025-04-08', 
      restaurant: 'Burger King', 
      items: 3, 
      total: 'R$54,70', 
      status: 'delivered' 
    },
    { 
      id: 'ORD123455', 
      date: '2025-04-05', 
      restaurant: 'Pizza Hut', 
      items: 2, 
      total: 'R$89,80', 
      status: 'delivered' 
    },
  ]);
  
  const [addresses] = useState([
    {
      id: '1',
      name: 'Home',
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Jardim Paulista',
      city: 'São Paulo',
      state: 'SP',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      street: 'Avenida Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      isDefault: false
    }
  ]);
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      duration: 3000,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/" className="inline-flex items-center text-gray-600 mb-6 hover:text-foodish-primary">
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      {/* Profile Info */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center">
          <div className="bg-foodish-light rounded-full h-16 w-16 flex items-center justify-center">
            <User size={32} className="text-foodish-primary" />
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
        </div>
      </div>
      
      {/* Addresses */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">My Addresses</h2>
            <Button variant="ghost" size="sm" className="text-foodish-primary">
              Add New
            </Button>
          </div>
        </div>
        
        {addresses.map((address) => (
          <div key={address.id} className="p-4 border-b last:border-b-0">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{address.name}</h3>
                  {address.isDefault && (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {address.street}, {address.number} - {address.neighborhood}
                </p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Order History */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Order History</h2>
        </div>
        
        {orders.map((order) => (
          <div key={order.id} className="p-4 border-b last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{order.restaurant}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Order #{order.id} • {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1">
                  {order.items} items • {order.total}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block
                  ${order.status === 'delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Logout */}
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut size={16} className="mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default Profile;
