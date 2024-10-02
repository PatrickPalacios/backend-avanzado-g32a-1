import jwt from 'jsonwebtoken'
// import User from '../models/userModel.js' // Asegúrate de que este modelo existe

// Middleware para verificar la autenticación
export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' })
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // Asegúrate de que JWT_SECRET está definido en tu .env
    req.user = decoded // Guardar la información del usuario en el request
    next() // Pasar al siguiente middleware o controlador
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido.' })
  }
}

// Middleware para verificar roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado. No tienes permiso para realizar esta acción.' })
    }
    next() // Si el rol es válido, pasar al siguiente middleware o controlador
  }
}
