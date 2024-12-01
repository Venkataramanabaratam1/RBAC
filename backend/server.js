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

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URL || "https://rbac-front-jet.vercel.app", // Frontend URL from environment variable or default
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Enable cookies/auth headers
};
app.use(cors(corsOptions)); // Apply CORS middleware
app.options("*", cors(corsOptions)); // Handle preflight requests

// Rate limiter for all routes
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.use('/', (req, res) => {
    res.json({ message: "API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
