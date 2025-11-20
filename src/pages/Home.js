import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Bell, Clock, ArrowRight } from 'lucide-react';
import WeatherWidget from '../components/ui/WeatherWidget.js';
import { useAuth } from '../hooks/useAuth.js';
import { useEvent } from '../context/EventContext.js';
import Button from '../components/ui/Button.js';
import EventCard from '../components/events/EventCard.js';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { events: upcomingEvents, fetchUpcomingEvents, loading } = useEvent();

  
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUpcomingEvents(3); 
    }
  }, [isAuthenticated, fetchUpcomingEvents]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Never Miss
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
              >
                An Event Again
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Stay organized with smart event reminders, beautiful dashboards, and instant notifications
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Go to Dashboard
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Get Started Free
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white/10 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose EventReminder?
            </h2>
            <p className="text-xl text-blue-100">
              Everything you need to stay on top of your schedule
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-12 h-12" />,
                title: "Smart Scheduling",
                description: "Easily create and manage events with our intuitive interface"
              },
              {
                icon: <Bell className="w-12 h-12" />,
                title: "Smart Reminders",
                description: "Get notified before your events with push notifications"
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Real-time Updates",
                description: "See your upcoming events and stats in real-time"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}

                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white text-center border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white/20 rounded-2xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-100 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {isAuthenticated && !loading && upcomingEvents.length > 0 && (

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Upcoming Events
              </h2>
              <p className="text-xl text-gray-600">
                Here's what's coming up next
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <Link to="/dashboard">
                <Button variant="outline" size="lg">
                  View All Events
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

     
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Plan Better with Weather
            </h2>
            <p className="text-xl text-blue-100">
              Know the weather for your upcoming events
            </p>
          </motion.div>

          <div className="flex justify-center">
            <WeatherWidget />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
