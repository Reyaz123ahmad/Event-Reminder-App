import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import { EventProvider } from './context/EventContext.js';

import { requestNotificationPermission } from './utils/notifications.js';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';

import Dashboard from './pages/Dashboard.js';
import Loader from './components/ui/Loader.js';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};


const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  useEffect(() => {
    
    requestNotificationPermission();
  }, []);

  return (
    <AuthProvider>
      <EventProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <Auth />
                </PublicRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
