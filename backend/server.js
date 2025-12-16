import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRoute from './routes/userRoutes.js';
import cors from 'cors';
import noteRoute from './routes/noteRoute.js';

connectDB();

const app = express();

app.use(express.json());

app.use(cors({
  // origin:"http://localhost:5173",
  origin: "https://note-taker-frontend-agyd.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/user', userRoute);
app.use('/notes',noteRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
