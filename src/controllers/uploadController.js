const uploadModel = require('../models/uploadModel');
const admin = require('../config/database');
const { v4: uuid } = require('uuid');
const { initUploadSchema, userIdParamSchema, deleteUploadParamsSchema } = require('../schemas/uploadSchema');

exports.initUpload = async (req, res) => {
    const params = userIdParamSchema.safeParse(req.params);
    const body = initUploadSchema.safeParse(req.body);

    if (!params.success) return res.status(400).json(params.error.format()); // err handling through zod validation
    if (!body.success) return res.status(400).json(body.error.format()); // err handling through zod validation

    const { userId } = params.data;
    const { contentType } = body.data;

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
    const params = userIdParamSchema.safeParse(req.params);
    if (!params.success) return res.status(400).json(params.error.format());

    const { userId } = params.data;

    const uploads = await uploadModel.getUploadsByUserId(userId);

    return res.json(uploads);
}

exports.deleteUpload = async (req, res) => {
    const params = deleteUploadParamsSchema.safeParse(req.params);
    if (!params.success) return res.status(404).json(params.error.format());

    const { uploadId } = params.data;

    const deleted = await uploadModel.deleteUploadById(uploadId);
    if (!deleted) return res.status(404).json({ message: 'Upload nicht gefunden' });

    return res.status(204).send();
} 