// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Navigate } from 'react-router-dom';
// import Login from '../components/auth/Login.js';
// import Signup from '../components/auth/Signup.js';
// import { useAuth } from '../hooks/useAuth.js';

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const { isAuthenticated } = useAuth();

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-between">
        
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring" }}
//             className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
//           >
//             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
//               <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M17 3h4a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z"/>
//               </svg>
//             </div>
//             <h1 className="text-4xl font-bold text-white">EventReminder</h1>
//           </motion.div>
          
//           <motion.h2
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-2xl lg:text-3xl font-semibold text-white mb-4"
//           >
//             {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
//           </motion.h2>
          
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-lg text-blue-100"
//           >
//             {isLogin 
//               ? 'Sign in to manage your events and never miss an important moment again.'
//               : 'Create your account and start organizing your events with smart reminders.'
//             }
//           </motion.p>

          
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="mt-8 space-y-3"
//           >
//             {[
//               'Smart event reminders',
//               'Beautiful dashboard',
//               'Push notifications',
//               'Weather integration'
//             ].map((feature, index) => (
//               <motion.div
//                 key={feature}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.8 + index * 0.1 }}
//                 className="flex items-center text-blue-100"
//               >
//                 <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 {feature}
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

        
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full lg:w-1/2 flex justify-center"
//         >
//           <AnimatePresence mode="wait">
//             {isLogin ? (
//               <Login key="login" onToggleMode={() => setIsLogin(false)} />
//             ) : (
//               <Signup key="signup" onToggleMode={() => setIsLogin(true)} />
//             )}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Auth;
















import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import Login from '../components/auth/Login.js';
import Signup from '../components/auth/Signup.js';
import { useAuth } from '../hooks/useAuth.js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, redirectToLogin } = useAuth();

  // NEW: If signup was successful, redirect to login form
  useEffect(() => {
    if (redirectToLogin && !isLogin) {
      setIsLogin(true);
    }
  }, [redirectToLogin, isLogin]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-between">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0 lg:pr-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3h4a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white">EventReminder</h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl lg:text-3xl font-semibold text-white mb-4"
          >
            {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-blue-100"
          >
            {isLogin 
              ? 'Sign in to manage your events and never miss an important moment again.'
              : 'Create your account and start organizing your events with smart reminders.'
            }
          </motion.p>

          {/* NEW: Success message after signup */}
          {redirectToLogin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-4"
            >
              ✅ Account created successfully! Please login.
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 space-y-3"
          >
            {[
              'Smart event reminders',
              'Beautiful dashboard',
              'Push notifications',
              'Weather integration'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center text-blue-100"
              >
                <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <Login key="login" onToggleMode={() => setIsLogin(false)} />
            ) : (
              <Signup key="signup" onToggleMode={() => setIsLogin(true)} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
