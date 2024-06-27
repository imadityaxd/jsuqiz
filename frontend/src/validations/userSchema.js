import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "password must have atleast 6 characters" }),
});

export { userSchema };
