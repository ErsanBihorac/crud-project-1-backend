const dotenv = require('dotenv'); // Load config files for Firebase/Database
dotenv.config();

const express = require('express');
const userRoutes = require('./routes/userRoutes');
const uploadRouters = require('./routes/uploadRoutes');

const app = express()

app.use(express.json());
app.use('/users', userRoutes);
app.use('/uploads', uploadRouters); 

module.exports = app;