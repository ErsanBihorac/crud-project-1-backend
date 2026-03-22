const uploadModel = require('../models/uploadModel');
const admin = require('../config/database');
const { v4: uuid } = require('uuid')

exports.initUpload = async (req, res) => {
    const { userId } = req.params;
    const { contentType } = req.body;

    if (!userId) return res.status(400).json({ message: "userId fehlt" });
    if (!contentType) return res.status(400).json({ message: "contentType fehlt" });

    const bucket = admin.storage().bucket();
    const uploadId = uuid();
    const storagePath = `users/${userId}/images/${uploadId}`;

    const file = bucket.file(storagePath);

    const [uploadUrl] = await file.getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000,
        contentType,
    });

    const [downloadUrl] = await file.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000,
    });

    const meta = await uploadModel.createUploadMetadata({
        userId,
        uploadId,
        storagePath,
        contentType,
        downloadUrl,
        createdAt: new Date().toISOString(),
    });

    return res.json({ uploadId, storagePath, uploadUrl, meta });
}

exports.getUploadsByUser = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: 'userId fehlt' });

    const uploads = await uploadModel.getUploadsByUserId(userId);

    return res.json(uploads);
}

exports.deleteUpload = async (req, res) => {
    const { userId, uploadId } = req.params;
    if (!userId || !uploadId) return res.status(400).json({ message: 'userId oder uploadId fehlt' });

    const deleted = await uploadModel.deleteUploadById(uploadId);
    if (!deleted) return res.status(404).json({ message: 'Upload nicht gefunden' });

    return res.status(204).send();
} 