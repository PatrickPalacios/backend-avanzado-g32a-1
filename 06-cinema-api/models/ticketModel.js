import mongoose from 'mongoose' // Cambié a import

const ticketSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  showTime: { type: Date, required: true },
  seats: { type: [String], required: true } // Lista de asientos reservados
})

const Ticket = mongoose.model('Ticket', ticketSchema)
export default Ticket // Cambié a exportación por defecto
