
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './button';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  items: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Cement & Concrete",
    description: "Premium quality cement and concrete products for all your building needs",
    image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=600&h=400",
    items: 124
  },
  {
    id: 2,
    name: "Building Blocks",
    description: "Durable building blocks for construction projects of all sizes",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=600&h=400",
    items: 86
  },
  {
    id: 3,
    name: "Roofing Materials",
    description: "High-quality roofing materials for residential and commercial buildings",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=600&h=400",
    items: 93
  },
  {
    id: 4,
    name: "Plumbing & Fixtures",
    description: "Complete range of plumbing supplies for your construction projects",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&h=400",
    items: 152
  },
  {
    id: 5,
    name: "Electrical & Lighting",
    description: "Quality electrical supplies and lighting solutions for any project",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=600&h=400",
    items: 118
  },
  {
    id: 6,
    name: "Doors & Windows",
    description: "Stylish and secure doors and windows for your building projects",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=600&h=400",
    items: 74
  }
];

const ProductCategories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="products" ref={sectionRef} className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`mb-12 p-6 rounded-lg border border-primary/20 bg-primary/5 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-gray-800 text-lg">
            Due to the current situation, we are unable to display our pricing and products. But that's not an issue - 
            <a 
              href="#contact" 
              className="inline-flex items-center font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded ml-1"
            >
              reach out to us <Phone className="ml-1 h-4 w-4" /> 
            </a> 
            for further inquiries and pricing.
          </p>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <p className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5">
            Our Product Categories
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'
          }`}>
            Quality Materials for Every Project
          </h2>
          <p className={`mt-4 text-lg text-gray-500 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'
          }`}>
            Explore our wide range of building materials for construction projects of all sizes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`group product-card rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-700 ${
                isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 image-blur-wrapper">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                  {category.items} Products
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-500 mb-4">
                  {category.description}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <a href="#contact">
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary-600 group/btn">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a href="#contact">
            <Button size="lg" className="transition-all duration-700 delay-500" variant="outline">
              View All Categories
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
