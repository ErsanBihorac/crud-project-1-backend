// die database.js ist der Ort an dem der zugriff auf die Datenbank eingeleitet wird. Dafür sollte man die Inhalte welche
//benötigt werden wie der Service account für die Firebase Datenbank aus der .env datei gezogen, damit kein die wichtigen
// Daten geschützt bleiben.

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
    credential: app.credential.cert(serviceAccount),
})

module.exports = app;
