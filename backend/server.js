const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Product = require('./database/models');
const sampleProducts = require('./products');

const app = express();
const PORT = 3000;

// Sync the database (create tables if they don't exist)
(async () => {
    try {
        await Product.sync({ force: true }); // Use `force: true` to drop and recreate the table
        console.log('Database synchronized.');

        // Add sample products to the database
        for (const product of sampleProducts) {
            await Product.findOrCreate({ where: { name: product.name }, defaults: product });
        }
        console.log('Sample products added to the database.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
})();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/images', express.static(path.join(__dirname, './images')));


// API routes
app.get('/api/products', async (req, res) => {
    try {
        const { category } = req.query;
        const where = category ? { category } : {}; 
        const products = await Product.findAll({ where });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products.' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Failed to fetch product details.' });
    }
});

app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;

    // Simulate saving data (log to console for now)
    console.log(`Received Contact Form:`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    // Send response
    res.status(200).json({ message: 'Thank you for contacting us!' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
