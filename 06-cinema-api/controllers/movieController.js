import Movie from '../models/movieModel.js' // Cambié a import

// Controlador para crear una nueva película
export const createMovie = async (req, res) => {
  try {
    const { name, director, releaseDate, rating, duration, genre } = req.body

    // Crear una nueva película en la base de datos
    const movie = new Movie({
      name,
      director,
      releaseDate,
      rating,
      duration,
      genre
    })

    await movie.save() // Guardar en la base de datos

    res.status(201).json({ message: 'Película creada exitosamente', movie })
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la película', error })
  }
}

// Controlador para obtener todas las películas (con posibilidad de filtrar)
export const getMovies = async (req, res) => {
  try {
    const { title, releaseDate, rating, genre } = req.query

    // Crear un objeto para filtrar por las propiedades si existen
    const filter = {}
    if (title) filter.name = { $regex: title, $options: 'i' } // Búsqueda parcial por título
    if (releaseDate) filter.releaseDate = releaseDate
    if (rating) filter.rating = rating
    if (genre) filter.genre = { $regex: genre, $options: 'i' } // Búsqueda parcial por género

    const movies = await Movie.find(filter) // Buscar películas en la base de datos con los filtros aplicados
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error })
  }
}

// Controlador para obtener una película por su ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id) // Obtener la película por ID

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la película', error })
  }
}

// Controlador para actualizar una película por su ID
export const updateMovie = async (req, res) => {
  try {
    const { name, director, releaseDate, rating, duration, genre } = req.body

    const movie = await Movie.findById(req.params.id)

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    // Actualizar los campos de la película
    movie.name = name || movie.name
    movie.director = director || movie.director
    movie.releaseDate = releaseDate || movie.releaseDate
    movie.rating = rating || movie.rating
    movie.duration = duration || movie.duration
    movie.genre = genre || movie.genre

    await movie.save() // Guardar los cambios en la base de datos

    res.status(200).json({ message: 'Película actualizada', movie })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la película', error })
  }
}

// Controlador para eliminar una película por su ID
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' })
    }

    await movie.remove() // Eliminar la película

    res.status(200).json({ message: 'Película eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película', error })
  }
}
