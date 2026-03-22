const { z } = require('zod');

const initUploadSchema = z.object({ // create validation schema
    contentType: z.string().min(1),
});

const userIdParamSchema = z.object({ // create validation schema
    userId: z.string().min(1),
});

const deleteUploadParamsSchema = z.object({ // create validation schema
    userId: z.string().min(1),
    uploadId: z.string().min(1),
});

module.exports = { // export
  initUploadSchema,
  userIdParamSchema,
  deleteUploadParamsSchema,
};