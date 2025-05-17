import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Filter, Search, X } from 'lucide-react';
import { Car } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Sample car data - replace with API call when backend is ready
const sampleCars: Car[] = [
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
    description: 'The Bentley Continental GT combines exquisite luxury with sporting performance.',
    features: ['W12 Engine', 'All-Wheel Drive', 'Handcrafted Interior', 'Naim Audio System'],
    available: true,
    location: 'New York',
    rating: 4.7,
    reviewCount: 19,
  },
  {
    _id: '5',
    make: 'Audi',
    model: 'R8',
    year: 2023,
    pricePerDay: 800,
    category: 'sports',
    images: ['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'],
    transmission: 'automatic',
    fuelType: 'petrol',
    seats: 2,
    description: 'The Audi R8 V10 offers supercar performance with everyday drivability and Audi\'s legendary Quattro all-wheel drive.',
    features: ['V10 Engine', 'Quattro AWD', 'Carbon Fiber Elements', 'Virtual Cockpit'],
    available: true,
    location: 'Chicago',
    rating: 4.8,
    reviewCount: 25,
  }
];

const categories = [
  { id: 'luxury', name: 'Luxury' },
  { id: 'sports', name: 'Sports' },
  { id: 'exotic', name: 'Exotic' },
  { id: 'suv', name: 'SUV' },
  { id: 'convertible', name: 'Convertible' },
];

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setCars(sampleCars);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesSearch = searchTerm === '' || 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filters.category === '' || car.category === filters.category;
    const matchesMinPrice = filters.minPrice === '' || car.pricePerDay >= parseInt(filters.minPrice);
    const matchesMaxPrice = filters.maxPrice === '' || car.pricePerDay <= parseInt(filters.maxPrice);
    const matchesLocation = filters.location === '' || 
      car.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesLocation;
  });

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      location: '',
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Our Fleet</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center"
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-primary-dark flex items-center"
              >
                <X size={16} className="mr-1" />
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="input-field"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price (per day)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Min price"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (per day)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Max price"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <motion.div
              key={car._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative pb-[60%] overflow-hidden">
                <img
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${car.pricePerDay}/day
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {car.year} {car.make} {car.model}
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex text-accent-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < car.rating ? "fill-current" : ""}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {car.rating} ({car.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                    {car.transmission}
                  </span>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                    {car.seats} seats
                  </span>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                    {car.fuelType}
                  </span>
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
            </motion.div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No cars found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;