import User from '../models/userModel.js' // Cambié a import
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// Registro de usuario
const registerUser = async (req, res) => {
  const { dni, firstName, lastName, birthDate, role, phone, email, password, username } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' })

    const user = await User.create({
      dni,
      firstName,
      lastName,
      birthDate,
      role,
      phone,
      email,
      password,
      username
    })

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

// Login de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' })
  }
}

// Obtener perfil de usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('_id username email role')

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' })
  }
}

// Exportar las funciones usando ES Modules
export {
  registerUser,
  loginUser,
  getUserProfile
}
