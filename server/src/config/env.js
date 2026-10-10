import dotenv from 'dotenv';

// Read values from .env into process.env
dotenv.config();

// Critical variables the app cannot start without
const REQUIRED_ENV_VARS = ['MONGO_URI'];

// Fail-Fast: halt immediately if anything critical is missing
for (const varName of REQUIRED_ENV_VARS) {
  if (!process.env[varName]) {
    throw new Error(
      `[Config Error] Missing required environment variable: ${varName}. Check your .env file.`
    );
  }
}

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGO_URI: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === 'production',
};