import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Calendar className="w-6 h-6" />
            <span className="text-xl font-bold">EventReminder</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>&copy; 2025 EventReminder. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
