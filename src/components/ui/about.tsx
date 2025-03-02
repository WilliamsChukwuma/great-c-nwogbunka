
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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

  const values = [
    { title: "Quality Materials", description: "We source and provide only the highest quality building materials." },
    { title: "Expert Guidance", description: "Our team offers expert advice on choosing the right materials for your project." },
    { title: "Reliable Service", description: "We deliver on time and provide consistent support throughout your project." },
    { title: "Competitive Pricing", description: "Premium materials at fair, market-competitive prices." }
  ];

  return (
    <div id="about" ref={sectionRef} className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className={`relative transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=800&h=600" 
                  alt="Great C Nwogbunka warehouse with building materials" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-900 font-medium">Years of Experience in Building Materials Industry</div>
              </div>
            </div>
            <div className="absolute inset-0 transform -translate-x-4 -translate-y-4 rounded-2xl border-2 border-primary/20 -z-10"></div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className={`inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5 transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                About Great C Nwogbunka
              </p>
              <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 leading-tight transition-all duration-700 delay-100 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Nigeria's Premium Building Materials Provider
              </h2>
              <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-200 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Great C Nwogbunka was founded with a vision to provide top-quality building materials to the Nigerian construction market. We've grown from a small supplier to one of the country's most trusted building materials providers.
              </p>
              <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-300 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Our commitment to quality, reliability, and customer satisfaction has been the cornerstone of our success for over 15 years.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div 
                  key={value.title} 
                  className={`flex items-start space-x-3 transition-all duration-700 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 mt-1">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
