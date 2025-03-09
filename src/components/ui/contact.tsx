
import { useRef, useState, useEffect } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from './button';
import { useToast } from "@/hooks/use-toast";
import { createClient } from '@supabase/supabase-js';

// Create Supabase client only if credentials are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Processing contact form submission");
      const messageContent = `New Inquiry from ${formState.name}:\n
Phone: ${formState.phone}\n
Email: ${formState.email}\n
Message: ${formState.message}`;
      
      // We'll try Supabase first, but continue even if it fails
      if (supabase) {
        try {
          console.log("Attempting to save to Supabase");
          const { data, error } = await supabase
            .from('contact_submissions')
            .insert([
              { 
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                message: formState.message,
                created_at: new Date().toISOString()
              }
            ])
            .select();
          
          if (error) {
            console.log("Supabase submission error:", error);
            // Continue with client-side methods even if Supabase fails
          } else {
            console.log("Successfully saved to Supabase:", data);
          }
        } catch (supabaseError) {
          console.error('Supabase error:', supabaseError);
          // Continue with client-side methods if Supabase throws an error
        }
      } else {
        console.log("Supabase client not available, proceeding with direct messaging");
      }
      
      // Always proceed with the client-side methods as backup
      const smsLink1 = `sms:+2348035051715?body=${encodeURIComponent(messageContent)}`;
      const smsLink2 = `sms:+2347066077173?body=${encodeURIComponent(messageContent)}`;
      
      const emailSubject = `New Inquiry from ${formState.name}`;
      const emailBody = messageContent;
      const mailtoLink = `mailto:greatcnwogbunka@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      
      console.log("Opening email client with formatted message");
      window.location.href = mailtoLink;
      
      // Set a short timeout to make sure the mailto link has time to open
      setTimeout(() => {
        window.open(smsLink1, '_blank');
        
        setTimeout(() => {
          window.open(smsLink2, '_blank');
        }, 500);
      }, 1000);

      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      toast({
        title: "Message sent successfully",
        description: "Your inquiry has been recorded and notifications sent. We'll get back to you soon!",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Message sending failed",
        description: "There was a problem sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      details: ["greatcnwogbunka@gmail.com", "info@greatcnwogbunka.com"]
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
            
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday:</span>
                  <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday:</span>
                  <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="text-gray-900 font-medium">Closed</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg h-[300px] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1982.1410763670917!2d7.576819815995429!3d6.485908810046827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgreat%20c%20nwogbunka!5e0!3m2!1sen!2sca!4v1738982119966!5m2!1sen!2sca" 
                className="w-full h-full border-0" 
                allowFullScreen 
                loading="lazy"
                title="Great C Nwogbunka Building Materials Location"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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
                    placeholder="Kenechukwu Okorie"
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
              
              <Button 
                type="submit" 
                className="w-full sm:w-auto group"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && (
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
