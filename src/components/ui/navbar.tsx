import { useState, useEffect } from 'react';
import { Search, Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from './button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <span className="font-display text-xl sm:text-2xl font-bold text-brand-950">
                Great C <span className="text-primary">Nwogbunka</span>
              </span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-medium text-gray-900 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#contact" className="font-medium text-gray-900 hover:text-primary transition-colors">
              Products
            </a>
            <a href="#about" className="font-medium text-gray-900 hover:text-primary transition-colors">
              About
            </a>
            <a href="#services" className="font-medium text-gray-900 hover:text-primary transition-colors">
              Services
            </a>
            <a href="#contact" className="font-medium text-gray-900 hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          
          {/* Desktop Right Side Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="h-5 w-5 text-gray-700" />
            </button>
            <a href="#contact" className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-xs flex items-center justify-center rounded-full">
                0
              </span>
            </a>
            <a href="#contact">
              <Button className="ml-4">
                Get a Quote
              </Button>
            </a>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-white text-xs flex items-center justify-center rounded-full">
                0
              </span>
            </button>
            <button 
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-1">
            <a href="#" className="block py-3 px-4 font-medium hover:bg-gray-50 rounded-md">
              Home
            </a>
            <a href="#contact" className="block py-3 px-4 font-medium hover:bg-gray-50 rounded-md">
              Products
            </a>
            <a href="#about" className="block py-3 px-4 font-medium hover:bg-gray-50 rounded-md">
              About
            </a>
            <a href="#services" className="block py-3 px-4 font-medium hover:bg-gray-50 rounded-md">
              Services
            </a>
            <a href="#contact" className="block py-3 px-4 font-medium hover:bg-gray-50 rounded-md">
              Contact
            </a>
            <div className="py-3 px-4">
              <a href="#contact">
                <Button className="w-full">
                  Get a Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
