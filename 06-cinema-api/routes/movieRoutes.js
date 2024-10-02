import express from 'express' // Cambié a import
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController.js' // Cambié a import
import { protect } from '../middleware/authMiddleware.js' // Cambié a import

const router = express.Router()

// Rutas para las películas
router.route('/').post(protect, createMovie).get(getMovies) // Crear y obtener películas
router.route('/:id').get(getMovieById).put(protect, updateMovie).delete(protect, deleteMovie) // Obtener, actualizar y eliminar película por ID

export default router // Cambié a export default
