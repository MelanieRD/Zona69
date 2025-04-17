const { body, validationResult } = require('express-validator');

// Validación para el registro de usuarios
const validateRegister = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Por favor ingresa un email válido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validación para el login
const validateLogin = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('El nombre de usuario es requerido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
];

// Validación para actualizar usuario
const validateUpdateUser = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Por favor ingresa un email válido'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Middleware para manejar los resultados de la validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateUser,
    handleValidationErrors
}; 