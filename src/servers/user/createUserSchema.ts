import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  authId: z.string(),
  email: z.string().email(),
  groupId: z.number().optional(),
  profileImageUrl: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
