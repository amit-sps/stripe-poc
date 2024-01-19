const express = require('express');
const app = express();
require("./config/database");
require("dotenv").config()
const cors = require("cors");
const bodyParser = require('body-parser');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// Add other middleware if necessary

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const stripeRoutes = require('./routes/stripeRoute');
const orderRoutes = require("./routes/orders");
const messRoutes = require("./routes/messRoute");

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/stripe',stripeRoutes);
app.use('/orders', orderRoutes);
app.use('/mess', messRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
