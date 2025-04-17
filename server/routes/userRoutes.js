const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const userRouter = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth');
const { validateUpdateUser } = require('../middlewares/validation');
const userController = require('../controllers/userController');

//Admin
userRouter.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: "Admin page"});
});


//super admin
userRouter.get("/superAdmin", verifyToken, authorizeRoles("superAdmin"), (req, res) => {
    res.json({message: "Super Admin page"});
});

// Rutas protegidas para usuarios autenticados
userRouter.get('/me', authenticateToken, userController.getCurrentUser);
userRouter.put('/me', authenticateToken, validateUpdateUser, userController.updateCurrentUser);
userRouter.delete('/me', authenticateToken, userController.deleteCurrentUser);

// Rutas protegidas para administradores
userRouter.get('/', authenticateToken, authorizeRole('admin'), userController.getAllUsers);
userRouter.get('/:id', authenticateToken, authorizeRole('admin'), userController.getUserById);
userRouter.put('/:id', authenticateToken, authorizeRole('admin'), validateUpdateUser, userController.updateUser);
userRouter.delete('/:id', authenticateToken, authorizeRole('admin'), userController.deleteUser);
userRouter.put('/:id/activate', authenticateToken, authorizeRole('admin'), userController.toggleUserStatus);

module.exports = userRouter;