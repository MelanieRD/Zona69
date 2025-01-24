const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const userRouter = express.Router();

//Admin
userRouter.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({message: "Admin page"});
});


//super admin
userRouter.get("/superAdmin", verifyToken, authorizeRoles("superAdmin"), (req, res) => {
    res.json({message: "Super Admin page"});
});

module.exports = userRouter;