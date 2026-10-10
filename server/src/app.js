import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

const app = express();

// 1. Cross-Origin Resource Sharing
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// 2. Request body parser (JSON payloads)
app.use(express.json());

// 3. Cookie parser for HttpOnly auth cookies
app.use(cookieParser());

// 4. Baseline Health Check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// 5. Connect to Database, then start listening for HTTP requests
const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`[Server] CampusOS backend running on http://localhost:${env.PORT}`);
  });
};

startServer();