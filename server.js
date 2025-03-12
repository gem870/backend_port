require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route'); // Import routes
const cors = require('cors');

const path = require('path');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//app.use('/uploads', express.static('uploads'));


app.use(cors({
    origin: "*", // replace with your frontend URL if deployed
}));

// Routes
app.use('/api', routes);  // Set base path for all routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully');
        app.listen(process.env.PORT, () => {
            console.log("Listening at port", process.env.PORT);
        });
    })
    .catch(err => console.error('Database connection error:', err));
