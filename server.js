import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// Database Connection
connectDB();

// Updated CORS Configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL, 
    'https://frontend-blog-app-beta.vercel.app', // Aapka current live frontend
    'https://blog-auth-frontend.vercel.app'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health check route (Taake 404 na aaye)
app.get('/', (req, res) => {
  res.status(200).json({ message: "Sana's Backend is running successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
