
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { videoRoutes } from './routes/videos'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/videos', videoRoutes)


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app