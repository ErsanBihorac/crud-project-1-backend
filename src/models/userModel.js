// src/models/userModel.js
const admin = require("../config/database");
const usersCollection = admin.firestore().collection("users");

// Die Models.js wird in dem Falle mit Firebase verwendet um hier die Datenbankzugriffslogik zu erstellen
// Die Inhalte die aus dem Firestore zurückkommen werden weitergereicht an den Controller welche die Inhalte mit Antworten
// weiterleitet und Fehler abfängt

const getAllUsers = async () => {
  const snapshot = await usersCollection.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const createUser = async (data) => {
  const docRef = await usersCollection.add(data);
  return { id: docRef.id, ...data };
};

const deleteUserById = async (id) => {
  const docRef = usersCollection.doc(id);
  const docSnap = await docRef.get();
  if (!docSnap.exists) return null;

  await docRef.delete();
  return { id };
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUserById,
};
