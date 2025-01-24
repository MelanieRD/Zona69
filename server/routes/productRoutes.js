const express = require('express');
const { getAllproducts, createProduct, getProductById, updateProduct, deleteProduct, getProductWithLimit, getProductsByFilters } = require('../controllers/productController');
const productRouter = express.Router();

productRouter.route("/all").get( getAllproducts);
productRouter.route("/limit").post( getProductWithLimit);
productRouter.route("/").post( createProduct);
productRouter.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);







module.exports = productRouter;