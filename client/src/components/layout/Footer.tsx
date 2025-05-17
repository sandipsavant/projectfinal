import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold mb-4 inline-block">
              Elite<span className="text-accent-gold">Auto</span>
            </Link>
            <p className="text-gray-300 mt-2 mb-4">
              Experience the epitome of luxury with our premium fleet of high-performance vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-gold">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-gold">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-gold">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-gold">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent-gold">Home</Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-accent-gold">Our Fleet</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent-gold">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent-gold">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-accent-gold">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/luxury-cars" className="text-gray-300 hover:text-accent-gold">Luxury Cars</Link>
              </li>
              <li>
                <Link to="/sports-cars" className="text-gray-300 hover:text-accent-gold">Sports Cars</Link>
              </li>
              <li>
                <Link to="/exotic-cars" className="text-gray-300 hover:text-accent-gold">Exotic Cars</Link>
              </li>
              <li>
                <Link to="/chauffeur" className="text-gray-300 hover:text-accent-gold">Chauffeur Service</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-accent-gold">Special Events</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-accent-gold" />
                <span className="text-gray-300">
                  123 Luxury Avenue, Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-accent-gold" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-accent-gold">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-accent-gold" />
                <a href="mailto:info@eliteauto.com" className="text-gray-300 hover:text-accent-gold">
                  info@eliteauto.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Elite Auto Rentals. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-accent-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-accent-gold">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 text-sm hover:text-accent-gold">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;