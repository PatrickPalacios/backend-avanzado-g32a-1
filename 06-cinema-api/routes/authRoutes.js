import express from 'express' // Cambié a import
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js' // Cambié a import
// authRoutes.js
import { authenticateUser } from '../middlewares/authMiddleware.js' // Cambié a authenticateUser

// Usa authenticateUser en lugar de protect en el código

const router = express.Router()

// Rutas de autenticación
router.post('/register', registerUser) // Registro
router.post('/login', loginUser) // Login
router.get('/profile', authenticateUser, getUserProfile) // Obtener perfil de usuario autenticado

export default router // Cambié a export default
