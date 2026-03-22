const express = require('express');
const { initUpload, getUploadsByUser, deleteUpload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/:userId', getUploadsByUser);
router.post('/:userId/init', initUpload);
router.delete('/:userId/:uploadId', deleteUpload)

module.exports = router; 