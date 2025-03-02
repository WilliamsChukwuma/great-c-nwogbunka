
import { useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/ui/hero";
import ProductCategories from "@/components/ui/product-categories";
import About from "@/components/ui/about";
import Services from "@/components/ui/services";
import Testimonials from "@/components/ui/testimonials";
import Contact from "@/components/ui/contact";
import Footer from "@/components/ui/footer";

const Index = () => {
  useEffect(() => {
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
