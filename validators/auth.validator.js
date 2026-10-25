const { z } = require("zod");

// FIX: real input validation instead of manual if-checks
const registerSchema = z.object({
  fullName: z.string().trim().min(2, "fullName must be at least 2 chars"),
  username: z
    .string()
    .trim()
    .min(3, "username must be at least 3 chars")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "username can only contain letters, numbers and _",
    ),
  password: z.string().min(8, "password must be at least 8 chars"),
});

const loginSchema = z.object({
  username: z.string().trim().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

module.exports = { registerSchema, loginSchema };
