// authMiddleware.js
import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido.' })
  }
}

// Asegúrate de que esta función existe
export const protect = authenticateUser // Usamos authenticateUser como protect para la autenticación
