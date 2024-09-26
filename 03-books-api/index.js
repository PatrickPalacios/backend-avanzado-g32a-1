import express from 'express'
import { connect } from './config/database.js'
import bookRoutes from './routes/bookRoutes.js'
import morgan from 'morgan'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(morgan('tiny'))

// Aqui van las rutas
app.use('/api/v1/books', bookRoutes)

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} 🚀`)
  })
})
