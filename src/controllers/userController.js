const userModel = require('../models/userModel');

// Die Controller.js datei wird verwendet um die Vordefinierten Datenbankzugriffsfunktionen aus der Model.js zu verwenden.
// Dabei werden fehler abgefangen und die richtigen status codes mit inhalten weitergeleitet

exports.getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(); // use function from model.js which returns all users
    res.json(users); // send respond with users
};

exports.createUser = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'Body fehlt' }); // err handling wenn body fehlt

    const created = await userModel.createUser(req.body); // snapshot vom erstellten User
    return res.status(201).json(created); // resp mit user
};

exports.deleteUser = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ message: 'Id fehlt' }); // err handling wenn id fehlt

    const deleted = await userModel.deleteUserById(req.params.id); // snapshot vom gelöschten user
    if (!deleted) res.status(404).json({ message: 'User nicht gefunden' }); // err handling wenn nutzer in der datenbank nicht gefunden wurde

    return res.status(204).send(); // response mit status code
};