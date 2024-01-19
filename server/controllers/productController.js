const ProductModel = require("../models/Product");

async function getAllProducts(req, res) {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 8; 
  
    const startIndex = (page - 1) * limit; 
    const endIndex = page * limit; 
  
    const total = await ProductModel.countDocuments(); 
  
    const products = await ProductModel.find()
      .skip(startIndex) 
      .limit(limit); 
  
    // Pagination info
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit
      };
    }
  
    return res.status(200).json({
      data: products,
      pagination
    });
  }
  

function getProductById(req, res) {
  // Logic to fetch a product by ID
}

function createProduct(req, res) {
  // Logic to create a new product
}

function updateProduct(req, res) {
  // Logic to update a product
}

function deleteProduct(req, res) {
  // Logic to delete a product
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
