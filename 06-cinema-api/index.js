import express from 'express';
import { connect } from './config/database.js';
import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';  // Error corregido: "form" cambiado a "from"
import morgan from 'morgan';

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Morgan es un middleware que ayuda a registrar las solicitudes HTTP en la consola
// tokens personalizados de Morgan
morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('host', (req) => req.hostname);
morgan.token('query', (req) => JSON.stringify(req.query));

// Registro de las solicitudes usando los tokens personalizados de Morgan
app.use(morgan(':host :method :url :status :query :res[content-length] - :response-time ms - :body'));

// Aquí van las rutas
app.use('/api/v1/movies', movieRoutes);  // Cambiado '/api/v1/books' a '/api/v1/movies' para tu proyecto de cine
app.use('/api/v1/auth', authRoutes);     // Usar la ruta 'authRoutes' para autenticación
app.use('/api/v1/tickets', ticketRoutes);  // Añadida la ruta de 'ticketRoutes'

// Conectar a la base de datos y lanzar el servidor
connect().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} 🚀`);
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});
