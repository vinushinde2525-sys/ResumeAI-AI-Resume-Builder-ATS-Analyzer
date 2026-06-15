import app from './app.js'
import connectDB from './config/db.js'
import { env } from './config/env.js'

const start = async () => {
  // Connect to MongoDB first, then start server
  if (env.MONGO_URI) {
    await connectDB()
  } else {
    console.warn('⚠️  MONGO_URI not set — skipping DB connection (set in .env to connect)')
  }

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`)
    console.log(`   Environment: ${env.NODE_ENV}`)
    console.log(`   Health check: http://localhost:${env.PORT}/api/health`)
  })
}

start()
