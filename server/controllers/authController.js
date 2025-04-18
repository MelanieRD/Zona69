const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists",
                field: existingUser.username === username ? 'username' : 'email'
            });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role: role || 'user'
        });

        await newUser.save();

        // Generar token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "User successfully registered",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            message: "Error during registration",
            error: err.message 
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario por username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar si el usuario está activo
        if (!user.isActive) {
            return res.status(403).json({ message: 'Usuario desactivado' });
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT con expiración de 24 horas
        const token = jwt.sign(
            { 
                id: user._id,
                username: user.username,
                role: user.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Actualizar último login
        user.lastLogin = new Date();
        await user.save();

        // No enviar la contraseña en la respuesta
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
            lastLogin: user.lastLogin
        };

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: userResponse
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error al iniciar sesión', 
            error: error.message 
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ 
            message: "Error fetching profile",
            error: err.message 
        });
    }
};

module.exports = { register, login, getProfile };