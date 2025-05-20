import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Fuel, Gauge, Star, Shield, Car as CarIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Car } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Sample car data - replace with API call when backend is ready
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Simulated API call
        const sampleCar: Car = {
          _id: '1',
          make: 'Rolls-Royce',
          model: 'Ghost',
          year: 2023,
          pricePerDay: 1500,
          category: 'luxury',
          images: [
            'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
            'https://images.pexels.com/photos/3764986/pexels-photo-3764986.jpeg'
          ],
          transmission: 'automatic',
          fuelType: 'petrol',
          seats: 5,
          description: 'The epitome of luxury, the Rolls-Royce Ghost offers unparalleled comfort and sophistication. This luxury sedan combines timeless elegance with cutting-edge technology to create the ultimate luxury driving experience. The handcrafted interior features the finest materials, with lambswool carpets, natural grain leather, and exquisite wood veneers. The Ghost\'s 6.75-liter twin-turbo V12 engine delivers effortless power, while the advanced suspension system provides a smooth "magic carpet" ride.',
          features: [
            'V12 Twin-Turbo Engine',
            'Starlight Headliner',
            'Massage Seats',
            'Rear Theater Configuration',
            'Bespoke Audio System',
            'Adaptive Cruise Control',
            'Night Vision with Pedestrian Detection',
            'Satellite Aided Transmission'
          ],
          available: true,
          location: 'Los Angeles',
          rating: 5.0,
          reviewCount: 12
        };
        
        setCar(sampleCar);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car:', error);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate);
      const end = new Date(selectedEndDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setTotalDays(days);
      setTotalPrice(days * (car?.pricePerDay || 0));
    }
  }, [selectedStartDate, selectedEndDate, car]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    // Add booking logic here
    console.log('Booking:', {
      carId: car?._id,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      totalPrice
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Car not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Car Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {car.images.map((image, index) => (
              <div key={index} className="relative pb-[60%] overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`${car.make} ${car.model} - View ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Car Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                
                <div className="flex items-center mb-4">
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

                <p className="text-gray-700 mb-6">{car.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <CarIcon size={20} className="mr-2 text-accent-gold" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users size={20} className="mr-2 text-accent-gold" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Fuel size={20} className="mr-2 text-accent-gold" />
                    <span>{car.fuelType}</span>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <Shield size={16} className="mr-2 text-accent-gold" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">₹{car.pricePerDay}</h2>
                  <span className="text-gray-600">per day</span>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Pick-up Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedStartDate}
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Return Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      className="input-field"
                      min={selectedStartDate || new Date().toISOString().split('T')[0]}
                      value={selectedEndDate}
                      onChange={(e) => setSelectedEndDate(e.target.value)}
                    />
                  </div>

                  {totalDays > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Daily rate</span>
                        <span>₹{car.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Number of days</span>
                        <span>{totalDays}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleBooking}
                    className="btn btn-primary w-full"
                    disabled={!selectedStartDate || !selectedEndDate}
                  >
                    {isAuthenticated ? 'Book Now' : 'Sign in to Book'}
                  </button>
                </form>

                <div className="mt-6 text-sm text-gray-600">
                  <p className="flex items-center mb-2">
                    <Calendar size={16} className="mr-2" />
                    Free cancellation up to 24 hours before pickup
                  </p>
                  <p className="flex items-center">
                    <Shield size={16} className="mr-2" />
                    Insurance included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetailsPage;