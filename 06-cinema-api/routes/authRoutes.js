import express from 'express' // Cambié a import
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js' // Cambié a import
import { protect } from '../middleware/authMiddleware.js' // Cambié a import

const router = express.Router()

// Rutas de autenticación
router.post('/register', registerUser) // Registro
router.post('/login', loginUser) // Login
router.get('/profile', protect, getUserProfile) // Obtener perfil de usuario autenticado

export default router // Cambié a export default
