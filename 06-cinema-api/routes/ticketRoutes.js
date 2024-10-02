import express from 'express' // Cambié a import
import { purchaseTicket, getTicketHistory, getAllTickets } from '../controllers/ticketController.js' // Cambié a import
import { protect } from '../middlewares/authMiddleware.js' // Cambié a import

const router = express.Router()

// Rutas para la compra de boletos y el historial
router.route('/').post(protect, purchaseTicket) // Solo los usuarios autenticados pueden comprar boletos
router.route('/history').get(protect, getTicketHistory) // Solo los usuarios autenticados pueden ver su historial
router.route('/all').get(protect, getAllTickets) // Solo los administradores pueden ver todos los boletos

export default router // Cambié a export default
