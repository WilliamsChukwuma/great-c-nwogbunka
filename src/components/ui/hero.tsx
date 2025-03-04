import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './button';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = (element as HTMLElement).dataset.speed || '0.5';
        const yPos = scrollPosition * parseFloat(speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center pt-16">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70 parallax" data-speed="-0.1"></div>
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl opacity-50 parallax" data-speed="0.05"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-8 transition-all duration-700 transform ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div>
              <p className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5">
                Nigeria's Trusted Building Materials
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Building Dreams, <br />
                <span className="text-primary">Delivering Excellence</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                Great C Nwogbunka provides premium building materials to bring your construction projects to life with quality and reliability.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <a href="#about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">10+</div>
                <div className="text-sm text-gray-500">Years of Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,000+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">5,000+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 transform ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent rounded-2xl transform translate-x-4 translate-y-4"></div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-100 shadow-2xl image-blur-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&h=900"
                alt="Building construction site with modern architecture" 
                className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'image-blur loaded' : 'image-blur'}`}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">100%</span>
                </div>
                <div>
                  <div className="font-medium">Quality Assured</div>
                  <div className="text-sm text-gray-500">Materials & Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
