import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedCars from '../components/home/FeaturedCars';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Elite Auto Rentals | Luxury Car Rental Service';
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedCars />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;