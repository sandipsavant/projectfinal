import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FrownIcon } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <div>
          <div className="flex justify-center">
            <FrownIcon className="h-24 w-24 text-primary-dark" />
          </div>
          <h1 className="mt-6 text-6xl font-extrabold text-primary-dark">404</h1>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-4 text-gray-600">
            We couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
          <Link to="/cars" className="btn btn-outline">
            Browse Our Fleet
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;