Event Reminder App - Documentation

Table of Contents

· Tech Stack
· Features
· Setup Instructions
· Deployment
· Project Structure
· Design Choices
· API Documentation

Tech Stack

Frontend

· React 18 - Modern React with hooks
· Tailwind CSS - Utility-first CSS framework
· Framer Motion - Animation library
· React Router DOM - Client-side routing
· Axios - HTTP client
· Lucide React - Icon library
· Context API - State management

Backend

· Node.js - Runtime environment
· Express.js - Web framework
· MongoDB - NoSQL database
· Mongoose - MongoDB object modeling
· JWT - JSON Web Tokens for authentication
· bcryptjs - Password hashing
· Joi - Data validation
· Helmet - Security middleware
· CORS - Cross-origin resource sharing

Deployment

· Frontend: Vercel
· Backend: Render
· Database: MongoDB Atlas
· CDN: Vercel Edge Network

Features

Authentication

· JWT-based signup and login
· Protected routes
· Auto-logout on token expiry
· Secure password hashing

Home Page

· Beautiful gradient background with animations
· Weather widget integration
· Current time display
· Upcoming events grid layout (2-3 cards per row)
· Motion animations for cards and text
· Responsive design

Dashboard

· Event statistics (total, active, completed)
· Filter events by status (All, Upcoming, Completed)
· Search functionality
· Pagination support
· Smooth event creation with micro-interactions
· Real-time status updates

Event Management

· Create events with title, description, date, image, location, category
· Edit existing events
· Delete events with confirmation
· Automatic status updates (upcoming → completed)
· Image preview and validation

Notifications

· Web Push notifications 30 minutes before events
· Service Worker implementation
· Browser notification permissions
· Real-time reminder system

UI/UX Features

· Responsive design for all devices
· Dark/light mode ready
· Smooth animations and transitions
· Loading states and error handling
· Micro-interactions on hover and click
· Accessible components

Setup Instructions

Prerequisites

· Node.js (v16 or higher)
· MongoDB (local or Atlas)
· Git

Backend Setup

1. Clone the repository
   bash
   git clone https://github.com/Reyaz123ahmad/Event-Reminder-App.git
   cd eventReminder-app-backend
   
2. Install dependencies
   bash
   npm install
   
3. Environment Configuration
   Create .env file:
   env
    DATABASE_URL=your string
    PORT=5000
    CLOUD_NAME=
    API_KEY=
    API_SECRET=
    JWT_SECRET=
    NODE_ENV=production
    FOLDER_NAME=
   
4. Start the server
   bash
   # Development
   npm run dev
   
   # Production
   npm start
   

Frontend Setup

1. Install dependencies
   bash
   npm install
   
2. Environment Configuration (Optional)
   Create .env file if needed:
   env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   REACT_APP_WEATHER_KEY=your_key
   
3. Start the development server
   bash
   npm run dev
   
4. Build for production
   bash
   npm run build
   

Database Setup

Option 1: Local MongoDB

bash
# Install MongoDB locally
# Start MongoDB service
mongod

# The app will create database automatically


Option 2: MongoDB Atlas

1. Create account at MongoDB Atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in backend .env

Deployment

Backend Deployment (Render)

1. Create Render account
   · Visit Render
   · Sign up with GitHub
2. Deploy from GitHub
   · Connect your GitHub repository
   · Select the backend folder
   · Add environment variables in Render dashboard
3. Environment Variables on Render
   env
   NODE_ENV=production
   MONGODB_URL=your-mongodb-atlas-connection-string
   JWT_SECRET=your-production-jwt-secret
   
   

Frontend Deployment (Vercel)

1. Create Vercel account
   · Visit Vercel
   · Sign up with GitHub
2. Deploy from GitHub
   · Import your GitHub repository
   · Set root directory to frontend
   · Configure build settings:
     · Build Command: npm run build
     · Output Directory: dist
     · Install Command: npm install
3. Environment Variables on Vercel
   env
   REACT_APP_API_URL=your-render-backend-url/api
   

Database Deployment (MongoDB Atlas)

1. Create Cluster
   · Go to MongoDB Atlas
   · Create new cluster
   · Choose free tier (M0)
2. Database Access
   · Create database user
   · Set username and password
3. Network Access
   · Add IP whitelist (0.0.0.0/0 for all IPs)
4. Get Connection String
   · Go to Clusters → Connect → Connect your application
   · Copy connection string
   · Replace password and database name

Project Structure

Backend Structure


eventReminder-app-backend/
├── config/
│   └── database.js          
├── controllers/
│   ├── authController.js    
│   └── eventController.js   
├── models/
│   ├── User.js             
│   └── Event.js            
├── routes/
│   ├── authRoutes.js       
│   └── eventRoutes.js     
├── middleware/
│   ├── auth.js             
│   ├── validation.js       
│   └── errorHandler.js     
├── services/
│   ├── authService.js      
│   └── eventService.js     
├── utils/
│   ├── constants.js        
│   ├── helpers.js          
│   ├── logger.js           
│   └── validators.js       
└── server.js               


Frontend Structure


eventReminder-app/
├── public/
│   ├── sw.js              
│   └── manifest.json      
├── src/
│   ├── components/
│   │   ├── auth/          
│   │   ├── events/        
│   │   ├── layout/        
│   │   ├── ui/            
│   │   └── dashboard/     
│   ├── pages/             
│   ├── context/           
│   ├── hooks/             
│   ├── services/          
│   ├── utils/             
│   └── styles/            
└── package.json

Design Choices

Architecture Decisions

1. MERN Stack Selection
   · MongoDB: Flexible schema for event data
   · Express.js: Minimalist web framework
   · React: Component-based UI with great ecosystem
   · Node.js: JavaScript full-stack consistency
2. Component-Based Architecture
   · Reusable and maintainable components
   · Separation of concerns
   · Easy testing and debugging
3. Context API for State Management
   · Built-in React solution
   · No external dependencies
   · Perfect for medium-sized applications

Security Implementation

1. Authentication
   · JWT tokens with expiration
   · Password hashing with bcrypt
   · Protected routes on frontend and backend
2. Input Validation
   · Joi validation on backend
   · Client-side form validation
   · SQL injection prevention with Mongoose
3. Security Headers
   · Helmet.js for security headers
   · CORS configuration
   · Rate limiting

Performance Optimizations

1. Frontend
   · Code splitting with React.lazy()
   · Image optimization
   · Efficient re-renders with proper hooks usage
2. Backend
   · Database indexing
   · Pagination for large datasets
   · Efficient API design
3. Real-time Features
   · Web Push notifications
   · Service Worker for offline capability
   · Periodic status updates

UI/UX Design Principles

1. Mobile-First Approach
   · Responsive design from mobile to desktop
   · Touch-friendly interfaces
   · Optimized loading times
2. Accessibility
   · Semantic HTML
   · Keyboard navigation
   · Screen reader friendly
3. Micro-interactions
   · Smooth animations with Framer Motion
   · Loading states
   · Hover effects
   · Transition animations

Code Quality

1. Clean Code Practices
   · Meaningful variable names
   · Consistent code formatting
   · Comprehensive comments
2. Error Handling
   · Global error boundary
   · User-friendly error messages
   · Proper logging
3. Testing Ready
   · Modular architecture
   · Pure functions
   · Easy mocking

API Documentation

Authentication Endpoints

POST /api/v1/auth/signup

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}


POST /api/v1/auth/login

json
{
  "email": "john@example.com",
  "password": "password123"
}


GET /api/v1/auth/me (Protected)

· Requires Bearer token

Event Endpoints

GET /api/v1/events (Protected)
Query Parameters:

· status: upcoming, completed
· page: number
· limit: number
· search: string

POST /api/v1/events (Protected)

json
{
  "title": "Team Meeting",
  "description": "Weekly sync",
  "date": "2024-01-20T10:00:00.000Z",
  "image": "https://example.com/image.jpg",
  "location": "Conference Room",
  "category": "Meeting"
}


PUT /api/v1/events/:id (Protected)

· Same body as POST

DELETE /api/v1/events/:id (Protected)

GET /api/v1/events/stats (Protected)

· Returns event statistics

GET /api/v1/events/upcoming (Protected)

· Returns upcoming events

Environment Variables

Backend (.env)

env

DATABASE_URL=your_url
PORT=5000
CLOUD_NAME=
API_KEY=
API_SECRET=
JWT_SECRET=
NODE_ENV=production
FOLDER_NAME=

Frontend (.env)

env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_WEATHER_KEY=your_key




Browser Support

· Chrome (latest)
· Firefox (latest)
· Safari (latest)
· Edge (latest)

Contributing

1. Fork the repository
2. Create feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open Pull Request

License

This project is licensed under the MIT License.

Acknowledgments

· Icons by Lucide
· UI inspiration from modern web applications
· Animation library Framer Motion

---

Live Demo: [Frontend URL] | [Backend URL]
Repository: [GitHub Repository URL]
Issues: [GitHub Issues]
Documentation: [This README]
