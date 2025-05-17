export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  drivingLicense?: {
    number?: string;
    state?: string;
    expiryDate?: string;
  };
  createdAt: string;
}

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  category: 'luxury' | 'sports' | 'suv' | 'convertible' | 'exotic';
  images: string[];
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  description: string;
  features: string[];
  available: boolean;
  location: string;
  rating: number;
  reviewCount: number;
}

export interface Booking {
  _id: string;
  car: Car;
  user: User;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}