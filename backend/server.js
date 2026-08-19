const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const documentRoutes = require('./routes/documentRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'same-origin' }
}));
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '1mb' }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
    code: 'RATE_LIMITED'
  }
});

app.use('/api/auth', authLimiter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend scaffold ready.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/documents', documentRoutes);

app.use(errorMiddleware);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
