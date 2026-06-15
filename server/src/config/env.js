import dotenv from 'dotenv'
dotenv.config()

const required = ['MONGO_URI', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET']

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`⚠️  Warning: Missing env var ${key} — some features may not work`)
  }
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || '15m',
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  AI_PROVIDER: process.env.AI_PROVIDER || 'openai',
}
