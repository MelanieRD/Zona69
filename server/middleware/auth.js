const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        try {
            const user = await User.findById(decoded.id);
            if (!user || !user.isActive) {
                return res.status(403).json({ message: 'Usuario no encontrado o inactivo' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Error al verificar el usuario', error: error.message });
        }
    });
};

// Middleware para autorizar roles específicos
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'No autorizado para esta acción' });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRole
}; 