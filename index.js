const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const authMiddleware = require('./middlewares/authMiddleware')

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
// Protected routes
app.use('/api/books', authMiddleware, bookRoutes);
app.use('/api/loans', authMiddleware, loanRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})