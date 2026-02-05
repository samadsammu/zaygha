const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new product (Admin only - simplified for now)
router.post('/', async (req, res) => {
    try {
        console.log('Received POST /products body:', req.body);
        const { name, description, price, purchasedPrice, category, imageUrl, inStock } = req.body;
        const product = new Product({
            name,
            description,
            price,
            purchasedPrice,
            category,
            imageUrl,
            inStock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error in POST /products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST multiple products (Bulk Insert)
router.post('/bulk', async (req, res) => {
    try {
        const products = req.body; // Expecting an array of products
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: 'Input must be an array of products' });
        }

        const createdProducts = await Product.insertMany(products);
        res.status(201).json({
            message: 'Bulk insert successful',
            count: createdProducts.length,
            products: createdProducts
        });
    } catch (error) {
        console.error('Error in POST /products/bulk:', error);
        res.status(500).json({ message: 'Server Error during bulk insert' });
    }
});

module.exports = router;
