const express = require("express");
const router = express.Router();


// auth
const authRoute = require('./authRoutes');
router.use('/auth', authRoute);


//user
const userRoute = require('./userRoutes');
router.use("/user",userRoute);


//product
const productRoute = require("./productRoutes");
router.use("/products", productRoute);


module.exports = router;