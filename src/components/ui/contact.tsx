
import { useRef, useState, useEffect } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from './button';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // Here you would typically send the form data to your backend
    alert('Thank you for your message. We will get back to you soon!');
    setFormState({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const contactInfo = [
    { 
      icon: <MapPin className="h-6 w-6" />, 
      title: "Visit Us", 
      details: ["Great C Nwogbunka Building Materials,", "72 Rahabitation road, Emene 400104,", "Enugu, Nigeria"]
    },
    { 
      icon: <Phone className="h-6 w-6" />, 
      title: "Call Us", 
      details: ["+2347066077173", "+2348035051715"]
    },
    { 
      icon: <Mail className="h-6 w-6" />, 
      title: "Email Us", 
      details: ["info@greatcnwogbunka.com", "sales@greatcnwogbunka.com"]
    }
  ];

  return (
    <div id="contact" ref={sectionRef} className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className={`inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-5 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Get In Touch
          </p>
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            Contact Us
          </h2>
          <p className={`mt-4 text-lg text-gray-500 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
          }`}>
            We're here to help with your building material needs. Reach out to our team for quotes, inquiries, or support.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          <div className={`lg:col-span-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={item.title} 
                  className="flex gap-4"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-primary/10 text-primary p-3 rounded-lg h-max">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-x-10'
          }`}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="+234 123 456 7890"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full sm:w-auto group">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
