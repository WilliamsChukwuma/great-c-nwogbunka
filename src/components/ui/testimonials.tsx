
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chijioke Okonkwo",
    role: "Project Manager",
    company: "Lagos Construction Ltd",
    content: "Great C Nwogbunka has been our trusted supplier for three major projects. Their materials are consistently high quality, and their delivery is always on time. We appreciate their professional approach and competitive pricing.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Amina Ibrahim",
    role: "Architect",
    company: "Modern Design Associates",
    content: "As an architect, I need reliable materials that match my specifications perfectly. Great C Nwogbunka understands this and provides excellent consulting on material selection. Their attention to detail has made them our go-to supplier.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Emmanuel Adeyemi",
    role: "Contractor",
    company: "Adeyemi Builders",
    content: "The bulk supply service from Great C Nwogbunka has transformed how we handle large projects. Their just-in-time delivery has helped us optimize our workflow and reduce storage costs. Highly recommended for any serious contractor.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    ));
  };
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    ));
  };
  
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

  return (
    <div ref={sectionRef} className="py-24 sm:py-32 bg-brand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className={`inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Customer Testimonials
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            What Our Clients Say
          </h2>
          <p className={`mt-4 text-lg text-gray-500 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Hear from professionals who rely on Great C Nwogbunka for their building material needs
          </p>
        </div>
        
        <div className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
        }`}>
          <div className="glass rounded-2xl p-8 sm:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden border-4 border-white shadow-lg">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-md">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < testimonials[activeIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <blockquote>
                  <p className="text-xl text-gray-700 italic leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </p>
                  
                  <footer className="mt-6">
                    <div className="font-display text-xl font-semibold text-gray-900">
                      {testimonials[activeIndex].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeIndex === index ? 'bg-primary scale-125' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
