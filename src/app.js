const dotenv = require('dotenv'); // Load config files for Firebase/Database
dotenv.config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express()

app.use(express.json());
app.use('/users', userRoutes); // routing zu users

module.exports = app;