const dotenv = require('dotenv'); // Load config files for Firebase/Database
dotenv.config();

const express = require('express');
const app = express()

const port = process.env.port || 3000

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Example App listening on port: ${port}`)
})