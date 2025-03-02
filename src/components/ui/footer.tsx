
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const productCategories = [
    { name: "Cement & Concrete", href: "#" },
    { name: "Building Blocks", href: "#" },
    { name: "Roofing Materials", href: "#" },
    { name: "Plumbing & Fixtures", href: "#" },
    { name: "Electrical & Lighting", href: "#" },
    { name: "Doors & Windows", href: "#" },
  ];
  
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Contact", href: "#contact" },
    { name: "Career", href: "#" },
    { name: "Blog", href: "#" },
  ];
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Great C Nwogbunka</h3>
            <p className="text-gray-300 mb-6">
              Nigeria's premier building materials supplier, offering quality products and expert services for construction projects of all sizes.
            </p>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <p className="text-gray-300">
                123 Lekki-Epe Expressway<br />
                Lagos, Nigeria
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on new products, special offers, and company news.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 text-gray-900 rounded-l-md focus:outline-none flex-grow"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/80 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <h4 className="text-base font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Great C Nwogbunka. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
