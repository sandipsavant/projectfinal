import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const heroImages = [
  'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
  'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg',
  'https://images.pexels.com/photos/6894427/pexels-photo-6894427.jpeg',
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 bg-center bg-cover ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

      {/* Content */}
      <div className="container-custom relative z-10 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Experience Luxury <br />
            <span className="text-accent-gold">Without Limits</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Discover our exclusive collection of premium vehicles. From sleek sports cars to elegant luxury sedans,
            we provide unmatched quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/cars" className="btn btn-secondary px-8 py-3">
              Explore Our Fleet
            </Link>
            <Link to="/about" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-dark px-8 py-3">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage ? 'bg-accent-gold w-6' : 'bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;