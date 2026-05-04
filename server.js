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
// server.js mein cors configuration ko aise update karein:
const allowedOrigins = [
  'https://backend-blog-app-jvb7.vercel.app', // Yeh wo URL hai jo error de raha hai
  'https://frontend-blog-app-beta.vercel.app',
  'https://blog-auth-frontend.vercel.app',
  process.env.FRONTEND_URL // Aapka main frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar origin list mein hai ya request local/mobile se hai, toh allow karein
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS Blocked for origin:", origin); // Debugging ke liye
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Sana's Backend is running successfully!" });
});

// Important: Vercel needs the app exported to handle it as a serverless function
export default app;

// Keep the listen for local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
