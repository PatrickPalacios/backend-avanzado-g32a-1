import express from 'express' // Cambié a import
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController.js' // Cambié a import
import { authenticateUser } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Rutas para las películas
router.route('/').post(authenticateUser, createMovie).get(getMovies) // Crear y obtener películas
router.route('/:id').get(getMovieById).put(authenticateUser, updateMovie).delete(authenticateUser, deleteMovie) // Obtener, actualizar y eliminar película por ID

export default router // Cambié a export default
