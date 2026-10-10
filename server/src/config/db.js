import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    // Event listener: Triggered whenever the DB connection drops unexpectedly
    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] Warning: Disconnected from MongoDB.');
    });

    // Event listener: Triggered if a runtime error occurs on the connection
    mongoose.connection.on('error', (err) => {
      console.error(`[Database] Error: ${err.message}`);
    });

    // Connect using the validated URI from our env config
    const conn = await mongoose.connect(env.MONGO_URI);

    console.log(`[Database] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database] Failed initial connection: ${error.message}`);
    // Exit process with failure code (1) to prevent running in a broken state
    process.exit(1);
  }
};

// Graceful shutdown handling on termination signal (Ctrl+C / Kill)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[Database] MongoDB connection closed due to app termination.');
  process.exit(0);
});