import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-center bg-cover z-0 before:content-[''] before:absolute before:inset-0 before:bg-primary-dark before:bg-opacity-80"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1280)' }}
      />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white mb-8 md:mb-0 max-w-xl"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
            <p className="text-gray-200 mb-6">
              Start your journey with Elite Auto Rentals today and drive the car of your dreams.
              Our premium fleet awaits your selection.
            </p>
            <Link 
              to="/cars" 
              className="btn btn-secondary px-8 py-3"
            >
              Explore Our Fleet
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold mb-4">Contact Us Directly</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-field"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder="youremail@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="input-field"
                  placeholder="Tell us what you're looking for"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;