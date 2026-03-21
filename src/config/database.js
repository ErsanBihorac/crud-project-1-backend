// die database.js ist der Ort an dem der zugriff auf die Datenbank eingeleitet wird. Dafür sollte man die Inhalte welche
//benötigt werden wie der Service account für die Firebase Datenbank aus der .env datei gezogen, damit kein die wichtigen
// Daten geschützt bleiben.
const dotenv = require("dotenv");
dotenv.config();

const admin = require('firebase-admin');

if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON fehlt in der .env');
}

let serviceAccount;
try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} catch (err) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON ist kein gültiges JSON');
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

module.exports = admin;
