import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  expiredDate: z.optional(z.date()),
  from: z.string().min(1, "発行元は必須です"),
  to: z.string().min(1, "発行先は必須です"),
  message: z.string().min(1, "メッセージは必須です"),
  backgroundColor: z.string().min(1, "背景色は必須です"),
  availableDateFrom: z.optional(z.date()),
});

export type CreateTicketSchema = z.infer<typeof createTicketSchema>;
