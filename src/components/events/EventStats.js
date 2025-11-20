import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const StatsCard = ({ icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
  >
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  </motion.div>
);

const EventStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        icon={<Calendar className="w-6 h-6 text-white" />}
        label="Total Events"
        value={stats?.totalEvents || 0}
        color="bg-blue-500"
      />
      <StatsCard
        icon={<Clock className="w-6 h-6 text-white" />}
        label="Active Events"
        value={stats?.activeEvents || 0}
        color="bg-green-500"
      />
      <StatsCard
        icon={<CheckCircle className="w-6 h-6 text-white" />}
        label="Completed Events"
        value={stats?.completedEvents || 0}
        color="bg-purple-500"
      />
    </div>
  );
};

export default EventStats;
