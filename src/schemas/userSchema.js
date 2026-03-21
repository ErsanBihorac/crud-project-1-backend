// Ein validierung Schema mit dem package zod, um den inhalt von body zu prüfen
const { z } = require('zod');

const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(1),
});

const result = createUserSchema.safeParse(req.body);

if (!result.success) return res.status(400).json(result.error.format());
