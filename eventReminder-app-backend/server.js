const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require("./config/cloudinary");
const database = require('./config/db.js');
const { errorHandler } = require('./middleware/errorHandler.js');
const logger = require('./utils/logger.js');
const authRoutes = require('./routes/authRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');


const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

database.connect();
  


//Security middleware
app.use(helmet());


const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://event-reminder-app-seven.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//Cloudinary connection
cloudinaryConnect();


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/events', eventRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


app.use(errorHandler);

//Start server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
