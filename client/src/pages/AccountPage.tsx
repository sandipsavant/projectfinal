import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { User, Car } from '../types';
import { User as UserIcon, MapPin, Phone, Mail, Car as CarIcon, Clock, Calendar } from 'lucide-react';

// Sample booking history since backend isn't connected
const sampleBookings = [
  {
    _id: 'b1',
    startDate: '2025-01-15',
    endDate: '2025-01-18',
    totalPrice: 3600,
    status: 'completed',
    car: {
      _id: '1',
      make: 'Lamborghini',
      model: 'Huracán',
      year: 2023,
      images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'],
    } as Car,
  },
  {
    _id: 'b2',
    startDate: '2025-03-10',
    endDate: '2025-03-15',
    totalPrice: 7500,
    status: 'confirmed',
    car: {
      _id: '2',
      make: 'Rolls-Royce',
      model: 'Ghost',
      year: 2022,
      images: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg'],
    } as Car,
  },
];

interface UserProfileForm {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  licenseNumber: string;
  licenseState: string;
}

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, signOut, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || '',
      licenseNumber: user?.drivingLicense?.number || '',
      licenseState: user?.drivingLicense?.state || '',
    },
  });

  if (!user) {
    return null; // Protected route should handle this, but just in case
  }

  const onSubmit = async (data: UserProfileForm) => {
    try {
      // Normally would update via API
      const updatedUser = {
        ...user,
        name: data.name,
        phone: data.phone,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        drivingLicense: {
          number: data.licenseNumber,
          state: data.licenseState,
        },
      };
      
      updateUser(updatedUser as User);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="bg-primary-dark rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <UserIcon className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
              
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'profile'
                          ? 'bg-primary-dark text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'bookings'
                          ? 'bg-primary-dark text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Booking History
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-primary-dark text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Settings
                    </button>
                  </li>
                </ul>
              </nav>
              
              <button
                onClick={handleSignOut}
                className="mt-8 w-full btn btn-outline"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">My Profile</h1>
                  
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                
                {updateSuccess && (
                  <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-md">
                    Profile updated successfully!
                  </div>
                )}
                
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className="input-field"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="text"
                          {...register('phone')}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          id="street"
                          type="text"
                          {...register('street')}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          {...register('city')}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          id="state"
                          type="text"
                          {...register('state')}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code
                        </label>
                        <input
                          id="zipCode"
                          type="text"
                          {...register('zipCode')}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          id="country"
                          type="text"
                          {...register('country')}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Driver's License Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          License Number
                        </label>
                        <input
                          id="licenseNumber"
                          type="text"
                          {...register('licenseNumber')}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="licenseState" className="block text-sm font-medium text-gray-700 mb-1">
                          Issuing State/Province
                        </label>
                        <input
                          id="licenseState"
                          type="text"
                          {...register('licenseState')}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-gray-700">
                            <UserIcon size={18} className="mr-2 text-accent-gold" />
                            <span className="font-medium mr-2">Name:</span> {user.name}
                          </li>
                          <li className="flex items-center text-gray-700">
                            <Mail size={18} className="mr-2 text-accent-gold" />
                            <span className="font-medium mr-2">Email:</span> {user.email}
                          </li>
                          <li className="flex items-center text-gray-700">
                            <Phone size={18} className="mr-2 text-accent-gold" />
                            <span className="font-medium mr-2">Phone:</span> 
                            {user.phone || 'Not provided'}
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Address</h3>
                        {user.address && (
                          <div className="flex items-start text-gray-700">
                            <MapPin size={18} className="mr-2 mt-1 text-accent-gold" />
                            <div>
                              <p>{user.address.street || 'Street not provided'}</p>
                              <p>
                                {[
                                  user.address.city,
                                  user.address.state,
                                  user.address.zipCode
                                ].filter(Boolean).join(', ')}
                              </p>
                              <p>{user.address.country || ''}</p>
                            </div>
                          </div>
                        )}
                        {(!user.address || !user.address.street) && (
                          <p className="text-gray-500 italic">Address information not provided</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Driver's License</h3>
                      {user.drivingLicense && user.drivingLicense.number ? (
                        <ul className="space-y-3">
                          <li className="flex items-center text-gray-700">
                            <CarIcon size={18} className="mr-2 text-accent-gold" />
                            <span className="font-medium mr-2">License Number:</span> 
                            {user.drivingLicense.number}
                          </li>
                          {user.drivingLicense.state && (
                            <li className="flex items-center text-gray-700">
                              <MapPin size={18} className="mr-2 text-accent-gold" />
                              <span className="font-medium mr-2">Issuing State:</span> 
                              {user.drivingLicense.state}
                            </li>
                          )}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">Driver's license information not provided</p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'bookings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h1 className="text-2xl font-bold mb-6">Booking History</h1>
                
                {sampleBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                    <button
                      onClick={() => navigate('/cars')}
                      className="btn btn-primary"
                    >
                      Browse Our Cars
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sampleBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 mb-4 md:mb-0">
                            <img
                              src={booking.car.images[0]}
                              alt={`${booking.car.make} ${booking.car.model}`}
                              className="h-28 w-full object-cover rounded-md"
                            />
                          </div>
                          
                          <div className="md:w-3/4 md:pl-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold">
                                {booking.car.year} {booking.car.make} {booking.car.model}
                              </h3>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                booking.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.status === 'confirmed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : booking.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                              <div className="flex items-center text-gray-600">
                                <Calendar size={16} className="mr-1" />
                                <span>Pickup: {new Date(booking.startDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar size={16} className="mr-1" />
                                <span>Return: {new Date(booking.endDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock size={16} className="mr-1" />
                                <span>
                                  Duration: {
                                    Math.ceil(
                                      (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / 
                                      (1000 * 60 * 60 * 24)
                                    )
                                  } days
                                </span>
                              </div>
                              <div className="flex items-center font-semibold">
                                Total: ₹{booking.totalPrice}
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button
                                onClick={() => navigate(`/cars/${booking.car._id}`)}
                                className="text-sm text-accent-gold hover:underline"
                              >
                                View Car
                              </button>
                              {booking.status === 'confirmed' && (
                                <button className="text-sm text-red-600 hover:underline">
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Email Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="marketing-emails"
                        type="checkbox"
                        className="h-4 w-4 text-accent-gold focus:ring-accent-gold border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="marketing-emails" className="ml-2 block text-gray-700">
                        Receive marketing emails about special offers and promotions
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="booking-notifications"
                        type="checkbox"
                        className="h-4 w-4 text-accent-gold focus:ring-accent-gold border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="booking-notifications" className="ml-2 block text-gray-700">
                        Receive booking confirmations and updates
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Password</h3>
                  <button
                    onClick={() => alert('Password change functionality would go here')}
                    className="btn btn-outline"
                  >
                    Change Password
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        alert('Account deletion would happen here');
                      }
                    }}
                    className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;