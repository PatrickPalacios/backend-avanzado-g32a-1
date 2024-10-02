const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  duration: { type: Number, required: true }, // Duración en minutos
  genre: { type: String, required: true }
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie
