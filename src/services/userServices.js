// Service wird verwendet für Regeln und abläufe, bsp: User darf nicht doppelt existieren und user muss eindeutig sein
// Daten werden vorbereitet, wie createdAt und updatedAt werden zu strings normalisiert
// es werden mehrere Datenquellen werden koordiniert, 1. Firestore speichern 2. log schreiben
// Fehler sauber kapseln, eigene Fehler werfen die Controller in HTTP Antworten übersetzen

const userModel = require('../models/userModel');
const { createUserSchema } = require('../schemas/userSchema');

const createUser = async (data) => {
  const result = createUserSchema.safeParse(data);

  if (!result.success){
    const error = new Error('Validierung fehlgeschlagen');
    error.status = 400;
    error.details = result.error.format();
    throw error;
  };

  return userModel.createUser(result.data);
};

const deleteUser = async (id) => {
    if (!id) {
        const error = new Error('User id fehlt');
        error.status = 400;
        throw error;
    };

    return userModel.deleteUserById(id);
};

module.exports = {
    createUser,
    deleteUser,
};