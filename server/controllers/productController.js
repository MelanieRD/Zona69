const { get } = require("mongoose");
const Product = require("../models/productModel");



const getAllproducts = async (req, res) => {
   try{
        const product = await Product.find();
        res.status(200).json(product);
   } catch (error) {
        res.status(500).json({ message: "Error getting products" });
   }

};

const getProductWithLimit = async (req, res) => {
    try{
        const {filters, skip, limit} = req.body;
        console.log(req.body); 

         // Si filters.category es un array, usa $in para buscar productos que pertenezcan a cualquiera de las categorías
        if (filters.category && Array.isArray(filters.category)) {
        filters.category = { $in: filters.category };
          }

        const products = await Product.find(filters).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filters);
        res.status(200).json({products, totalProducts});
    } catch (error) {
        res.status(500).json({ message: "Error getting products with a limit" });
    }
 
 };



const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error getting the product by the ID" });
    }

};

const createProduct = (req, res) => {
    try{
        const product = new Product(req.body);
        product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
};

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        } 
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

const deleteProduct =  async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });


    }catch(error){
        res.status(500).json({ message: "Error deleting product" });
    }
};

module.exports = {getAllproducts, getProductById, createProduct, updateProduct, deleteProduct, getProductWithLimit };