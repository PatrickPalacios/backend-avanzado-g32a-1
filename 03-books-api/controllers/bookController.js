import Author from '../models/Author.js'
import Book from '../models/Book.js'

// CREATE
const createBook = async (req, res) => {
  const bookData = req.body

  // Validaciones
  if (Object.keys(bookData).length === 0) {
    return res.status(400).json({ message: 'Book data is required' })
  }

  if (!Array.isArray(bookData.authors)) {
    return res.status(400).json({ message: 'Authors must be an array' })
  }

  if (!bookData.authors || bookData.authors.length === 0) {
    return res.status(400).json({ message: 'Book must have at least one author' })
  }

  // Crear autores, uno por uno y esperar a que todos se guarden en la colección
  try {
    const authorModels = await Promise.all(bookData.authors.map(async author => {
      // Si el autor ya existe, devolverlo; sino crearlo.
      const existingAuthor = await Author.findOne({ firstName: author.firstName, lastName: author.lastName, birthDate: author.birthDate }) // Si findOne no encuentra nada, devuelve null.

      if (existingAuthor) {
        return existingAuthor
      }

      // Si el autor no existe, se crea uno nuevo
      const newAuthor = new Author(author)
      return await Author.create(newAuthor)
    }))

    // Como ya se guardaron los autores, se pueden asignar al libro. Necesitamos los _id de los autores.
    bookData.authors = authorModels.map(author => author._id)

    // Crear el libro
    const newBook = await Book.create(bookData)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ
const getAllBooks = async (req, res) => {
  try {
    const books = await Book
      .find({ isActive: true })
      .populate('authors', 'firstName lastName bio birthDate -_id') // populate('authors') reemplaza los ObjectID de authors por los documentos de la colección Author. 'firstName lastName birthDate -_id' indica que solo se deben mostrar esos campos y no el _id.
    if (!books) {
      return res.status(404).json({ message: 'No books found' })
    }
    res.status(200).json(books)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// UPDATE

// DELETE

export {
  createBook,
  getAllBooks
}
