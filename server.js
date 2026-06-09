const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Load Environment Variables
dotenv.config();

// 2. Initialize the App
const app = express();

// 3. Middleware
app.use(express.json());
app.use(cors());

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.log('❌ DB Connection Error:', err));

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION:', err.stack);
});

// 5. Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 6. Test Route
app.get('/', (req, res) => {
    res.send('Minimalist Store API is running...');
});

// 7. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server spinning on port ${PORT}`);
});