import { motion } from 'framer-motion';
import { Search, Car, Calendar, Key } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Browse Our Collection',
    description: 'Explore our extensive fleet of luxury and exotic vehicles to find your perfect match.',
    icon: Search,
    color: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    id: 2,
    title: 'Choose Your Vehicle',
    description: 'Select from top brands like Lamborghini, Ferrari, Bentley, and more.',
    icon: Car,
    color: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
  {
    id: 3,
    title: 'Book Your Dates',
    description: 'Reserve your luxury vehicle for the dates you need with our simple booking system.',
    icon: Calendar,
    color: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    id: 4,
    title: 'Enjoy Your Experience',
    description: 'Pick up your vehicle and enjoy a premium driving experience like no other.',
    icon: Key,
    color: 'bg-accent-gold bg-opacity-10',
    iconColor: 'text-accent-gold',
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Renting a luxury vehicle with Elite Auto Rentals is simple and straightforward.
            Follow these steps to experience the thrill of driving your dream car.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.id} 
              className="relative"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                  <step.icon className={`${step.iconColor}`} size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-200 -z-10">
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-3 h-3 bg-accent-gold rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;