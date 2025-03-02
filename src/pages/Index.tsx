
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/ui/hero";
import ProductCategories from "@/components/ui/product-categories";
import About from "@/components/ui/about";
import Services from "@/components/ui/services";
import Testimonials from "@/components/ui/testimonials";
import Contact from "@/components/ui/contact";
import Footer from "@/components/ui/footer";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification banner after a slight delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          window.scrollTo({
            top: (target as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Intersection Observer for page sections (for additional animations if needed)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      clearTimeout(timer);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
      
      document.querySelectorAll('section').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Notification Banner */}
      <div 
        className={`fixed top-20 left-0 right-0 z-50 p-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 shadow-md">
            <p className="text-gray-800 text-center text-lg">
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
        </div>
      </div>
      
      <Hero />
      <ProductCategories />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
