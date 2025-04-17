const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {
    // Obtener el usuario actual
    getCurrentUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
        }
    },

    // Actualizar el usuario actual
    updateCurrentUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Actualizar campos
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            await user.save();
            res.json({ message: 'Usuario actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
        }
    },

    // Eliminar el usuario actual
    deleteCurrentUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Marcar como inactivo en lugar de eliminar
            user.isActive = false;
            await user.save();

            res.json({ message: 'Usuario desactivado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al desactivar el usuario', error: error.message });
        }
    },

    // Obtener todos los usuarios (solo admin)
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
        }
    },

    // Obtener usuario por ID (solo admin)
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
        }
    },

    // Actualizar usuario por ID (solo admin)
    updateUser: async (req, res) => {
        try {
            const { name, email, role, isActive } = req.body;
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Actualizar campos
            if (name) user.name = name;
            if (email) user.email = email;
            if (role) user.role = role;
            if (typeof isActive === 'boolean') user.isActive = isActive;

            await user.save();
            res.json({ message: 'Usuario actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
        }
    },

    // Eliminar usuario por ID (solo admin)
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Eliminar permanentemente
            await user.remove();
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
        }
    },

    // Activar/desactivar usuario (solo admin)
    toggleUserStatus: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            user.isActive = !user.isActive;
            await user.save();

            res.json({ 
                message: `Usuario ${user.isActive ? 'activado' : 'desactivado'} correctamente`,
                isActive: user.isActive 
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al cambiar el estado del usuario', error: error.message });
        }
    }
};

module.exports = userController; 