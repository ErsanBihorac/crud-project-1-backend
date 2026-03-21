const express = require('express');
const { getUsers, createUser, deleteUser} = require('../controllers/userController');
const router = express.Router();

// Die Routes.Js ist der zentralle Ort um die URL mit parametern zu definieren.
// Die funktionen welche abgerufen werden sollen bei zugriff auf diese Routen werden aus dem Controller importiert.

router.get('/api/user', getUsers);
router.post('/api/user', createUser);
router.delete('/api/user/:id', deleteUser);

module.exports = router;