import Ticket from '../models/ticketModel.js' // Cambié a import
import Movie from '../models/movieModel.js' // Cambié a import
// import User from '../models/userModel.js' // Cambié a import

// Controlador para comprar boletos
export const purchaseTicket = async (req, res) => {
  try {
    const { movieId, quantity, price, totalValue, showTime, seats } = req.body
    const userId = req.user._id // Asegúrate de que `req.user` contiene el usuario autenticado

    // Verificar que la película exista
    const movie = await Movie.findById(movieId)
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    // Crear el boleto
    const ticket = new Ticket({
      customer: userId, // Cambié 'user' a 'customer' para que coincida con el modelo
      movie: movieId,
      quantity,
      price,
      totalPrice: totalValue, // Cambié a totalPrice para que coincida con el modelo
      showTime,
      seats
    })

    await ticket.save() // Guardar el boleto en la base de datos

    res.status(201).json({ message: 'Boletos comprados exitosamente', ticket })
  } catch (error) {
    res.status(500).json({ message: 'Error al comprar boletos', error })
  }
}

// Controlador para obtener el historial de boletos del usuario autenticado
export const getTicketHistory = async (req, res) => {
  try {
    const userId = req.user._id // Asegúrate de que `req.user` contiene el usuario autenticado

    // Obtener todos los boletos comprados por el usuario autenticado
    const tickets = await Ticket.find({ customer: userId }) // Cambié 'user' a 'customer'
      .populate('movie', 'name director') // Populamos información de la película

    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el historial de boletos', error })
  }
}

// Controlador para obtener todos los boletos (solo para administradores)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('customer', 'username') // Cambié 'user' a 'customer'
      .populate('movie', 'name') // Populamos información del usuario y la película
    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todos los boletos', error })
  }
}
