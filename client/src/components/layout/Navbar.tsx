import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const navbarClasses = `fixed w-full z-30 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const linkClasses = `text-sm font-medium ${
    isScrolled ? 'text-gray-800 hover:text-accent-gold' : 'text-white hover:text-accent-gold'
  }`;

  const homePageActive = location.pathname === '/';

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-bold ${isScrolled || !homePageActive ? 'text-primary-dark' : 'text-white'}`}>
              Elite<span className="text-accent-gold">Auto</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClasses}>Home</Link>
            <Link to="/cars" className={linkClasses}>Our Fleet</Link>
            <Link to="/about" className={linkClasses}>About</Link>
            <Link to="/contact" className={linkClasses}>Contact</Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={toggleProfile}
                  className={`flex items-center space-x-1 ${linkClasses}`}
                >
                  <span>{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40">
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link 
                      to="/bookings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Bookings
                    </Link>
                    <button 
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/signin" 
                className={`btn ${isScrolled || !homePageActive ? 'btn-primary' : 'btn-secondary'}`}
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X size={24} className={isScrolled || !homePageActive ? 'text-primary-dark' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled || !homePageActive ? 'text-primary-dark' : 'text-white'} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-primary-dark bg-opacity-95 pt-20">
          <div className="flex flex-col items-center space-y-6 p-6">
            <Link to="/" className="text-lg font-medium text-white hover:text-accent-gold">Home</Link>
            <Link to="/cars" className="text-lg font-medium text-white hover:text-accent-gold">Our Fleet</Link>
            <Link to="/about" className="text-lg font-medium text-white hover:text-accent-gold">About</Link>
            <Link to="/contact" className="text-lg font-medium text-white hover:text-accent-gold">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/account" className="text-lg font-medium text-white hover:text-accent-gold">
                  <User className="inline-block mr-2" size={18} />
                  {user?.name}
                </Link>
                <button 
                  onClick={signOut}
                  className="btn btn-secondary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/signin" className="btn btn-secondary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Add a spacer for fixed navbar */}
      <div className={homePageActive ? "" : "h-16 md:h-20"}></div>
    </>
  );
};

export default Navbar;