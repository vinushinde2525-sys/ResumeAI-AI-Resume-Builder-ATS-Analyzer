import app from './app.js'
import connectDB from './config/db.js'
import { env } from './config/env.js'
import { closeBrowser } from './features/export/export.service.js'

const start = async () => {
  // Connect to MongoDB first, then start server
  if (env.MONGO_URI) {
    await connectDB()
  } else {
    console.warn('⚠️  MONGO_URI not set — skipping DB connection (set in .env to connect)')
  }

  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`)
    console.log(`   Environment: ${env.NODE_ENV}`)
    console.log(`   Health check: http://localhost:${env.PORT}/api/health`)
  })

  // Close the shared Puppeteer browser instance on shutdown so the
  // process doesn't hang waiting on an open Chromium process.
  const shutdown = async () => {
    console.log('Shutting down gracefully...')
    await closeBrowser()
    server.close(() => process.exit(0))
  }
  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

start()
