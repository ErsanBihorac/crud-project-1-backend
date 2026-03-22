const admin = require('../config/database');
const uploadsCollection = admin.firestore().collection('uploads');

//uploadModel.js soll nur den Datenzugriff auf Firestore für Upload-Metadaten enthalten
//Das model speichert keine Dateien, es speichert nur Infos über Dateien (Pfad, UserId ...)

const getUploadsByUserId = async (userId) => {
    const snapshot = await uploadsCollection.where('userId', '==', userId).get(); // get uploads based on the userId 
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // map the documents into a new array with the document id
}

const createUploadMetadata = async (data) => {
    const docRef = await uploadsCollection.add(data); // document gets added to the collection, which can be accessed through admin.firestore().collection('uploads');
    return { id: docRef.id, ...data }; // returns metadata back
}

const deleteUploadById = async (uploadId) => {
    const docRef = uploadsCollection.doc(uploadId); // get document reference
    const docSnap = await docRef.get(); // get content of document reference
    if (!docSnap.exists) return null; // err handling if no document content exists

    await docRef.delete(); // delete document reference
    return { id: uploadId };
}

module.exports = {
  createUploadMetadata,
  getUploadsByUserId,
  deleteUploadById,
};