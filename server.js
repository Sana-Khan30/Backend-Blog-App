import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// 1. Database Connection
connectDB();

// 2. Body Parsers (Routes aur CORS se pehle lazmi hona chahiye)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. CORS Configuration
const allowedOrigins = [
  'https://backend-blog-app-jvb7.vercel.app',
  'https://frontend-blog-app-beta.vercel.app',
  'https://blog-auth-frontend.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked by Sana Samad Server'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// 4. Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Sana's Backend is running successfully!" });
});

// Vercel export
export default app;

// Keep the listen for local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
