import express from 'express'
import dotenv from 'dotenv'
import { connect } from './config/database.js'
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'
import morgan from 'morgan'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json())

// Morgan es un middleware que ayuda a registrar las solicitudes HTTP en la consola
// tokens personalizados de Morgan
morgan.token('body', (req) => JSON.stringify(req.body))
morgan.token('host', (req) => req.hostname)
morgan.token('query', (req) => JSON.stringify(req.query))

// Registro de las solicitudes usando los tokens personalizados de Morgan
app.use(morgan(':host :method :url :status :query :res[content-length] - :response-time ms - :body'))

// Aquí van las rutas
app.use('/api/v1/movies', movieRoutes) // Usar la ruta '/api/v1/movies' para el proyecto de cine
app.use('/api/v1/auth', authRoutes) // Usar la ruta 'authRoutes' para autenticación
app.use('/api/v1/tickets', ticketRoutes) // Añadida la ruta de 'ticketRoutes'

// Conectar a la base de datos y lanzar el servidor
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} 🚀`)
  })
}).catch((error) => {
  console.error('Error connecting to the database:', error)
})
