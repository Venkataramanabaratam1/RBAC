import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routers/authRoutes.js';

dotenv.config();
const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Rate limiter for all routes
app.use(rateLimiter);

app.use('/api/auth', authRoutes);

app.use('/', (req,res) => {
  res.json({message:"API IS RUNNING"})
});

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});