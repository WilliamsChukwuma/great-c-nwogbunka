
import { useRef, useState, useEffect } from 'react';
import { TruckIcon, ClipboardCheck, Clock, BadgePercent, Users2, Building } from 'lucide-react';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <TruckIcon className="h-8 w-8" />,
    title: "Nationwide Delivery",
    description: "Fast and reliable delivery of building materials to any location in Nigeria."
  },
  {
    icon: <ClipboardCheck className="h-8 w-8" />,
    title: "Project Consultation",
    description: "Expert advice on material selection and quantity estimation for your project."
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Bulk Supply",
    description: "Specialized solutions for large-scale construction projects with bulk pricing."
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Just-in-Time Delivery",
    description: "Scheduled deliveries to match your construction timeline and reduce storage needs."
  },
  {
    icon: <BadgePercent className="h-8 w-8" />,
    title: "Trade Accounts",
    description: "Special pricing and credit terms for builders, contractors, and trade professionals."
  },
  {
    icon: <Users2 className="h-8 w-8" />,
    title: "Contractor Network",
    description: "Connect with our network of trusted contractors and construction professionals."
  }
];

const Services = () => {
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

  return (
    <div id="services" ref={sectionRef} className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className={`inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Our Services
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Supporting Your Construction Journey
          </h2>
          <p className={`mt-4 text-lg text-gray-500 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            We go beyond simply providing materials. Our comprehensive services are designed to support your entire construction process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-md group ${
                isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="p-3 bg-primary/10 rounded-lg inline-block mb-5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
