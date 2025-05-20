import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import api from '../../utils/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Car } from '../../types';

// Fallback data in case API is not yet connected
const fallbackCars: Car[] = [
  {
    _id: '1',
    make: 'Lamborghini',
    model: 'Huracán',
    year: 2023,
    pricePerDay: 1200,
    category: 'exotic',
    images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 2,
    description: 'Experience the thrill of driving a Lamborghini Huracán with its powerful V10 engine and striking design.',
    features: ['V10 Engine', 'All-Wheel Drive', 'Carbon Fiber Interior', 'Launch Control'],
    available: true,
    location: 'Los Angeles',
    rating: 4.9,
    reviewCount: 28,
  },
  {
    _id: '2',
    make: 'Rolls-Royce',
    model: 'Ghost',
    year: 2022,
    pricePerDay: 1500,
    category: 'luxury',
    images: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg'],
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 5,
    description: 'The epitome of luxury, the Rolls-Royce Ghost offers unparalleled comfort and sophistication.',
    features: ['V12 Engine', 'Starlight Headliner', 'Massage Seats', 'Rear Entertainment'],
    available: true,
    location: 'Miami',
    rating: 5.0,
    reviewCount: 15,
  },
  {
    _id: '3',
    make: 'Ferrari',
    model: '488 GTB',
    year: 2022,
    pricePerDay: 1300,
    category: 'sports',
    images: ['https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg'],
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 2,
    description: 'The Ferrari 488 GTB is a masterpiece of engineering, offering exhilarating performance and timeless Italian styling.',
    features: ['V8 Twin-Turbo', 'Carbon Ceramic Brakes', 'F1 Dual-Clutch Transmission', 'Manettino Dial'],
    available: true,
    location: 'Las Vegas',
    rating: 4.8,
    reviewCount: 22,
  },
  {
    _id: '4',
    make: 'Bentley',
    model: 'Continental GT',
    year: 2023,
    pricePerDay: 900,
    category: 'luxury',
    images: ['https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg'],
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 4,
    description: 'The Bentley Continental GT combines exquisite luxury with sporting performance for an unforgettable driving experience.',
    features: ['W12 Engine', 'All-Wheel Drive', 'Handcrafted Interior', 'Naim Audio System'],
    available: true,
    location: 'New York',
    rating: 4.7,
    reviewCount: 19,
  },
];

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars?featured=true');
        setCars(data);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
        setError('Failed to load featured cars. Using sample data instead.');
        setCars(fallbackCars);
      } finally {
        setLoading(false);
      }
    };

    // Simulate API call for demonstration
    setTimeout(() => {
      setCars(fallbackCars);
      setLoading(false);
    }, 1000);
    
    // Uncomment below when backend is ready
    // fetchCars();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
  };

  // Show 1 card on mobile, 2 on medium screens, 3 on large screens
  const getVisibleCars = () => {
    if (cars.length === 0) return [];
    
    // We're returning all cars since we'll handle visibility in CSS
    // This way the responsive design works better
    return cars;
  };

  const visibleCars = getVisibleCars();

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Luxury Vehicles</h2>
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Luxury Vehicles</h2>
          <div className="flex gap-2">
            <button 
              onClick={prevSlide}
              className="btn btn-outline p-2"
              aria-label="Previous cars"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="btn btn-outline p-2"
              aria-label="Next cars"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-error mb-4">{error}</p>}

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100 / cars.length}%)` }}
          >
            {visibleCars.map((car) => (
              <motion.div 
                key={car._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] px-4"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                  <div className="relative pb-[60%] overflow-hidden">
                    <img 
                      src={car.images[0]} 
                      alt={`${car.make} ${car.model}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ₹{car.pricePerDay}/day
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="flex items-center mb-3">
                      <div className="flex text-accent-gold">
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                        <Star className="fill-current" size={16} />
                        <Star className={car.rating >= 5 ? "fill-current" : ""} size={16} />
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {car.rating} ({car.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">{car.transmission}</span>
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">{car.seats} seats</span>
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">{car.fuelType}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {car.description}
                    </p>
                    <Link 
                      to={`/cars/${car._id}`}
                      className="btn btn-primary w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/cars" className="btn btn-outline">
            View All Vehicles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;