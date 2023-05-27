import { TicketManageType } from "@prisma/client";
import { z } from "zod";

export const createTicketManageSchema = z.object({
  name: z.string(),
  count: z.number(),
  type: z.enum([
    TicketManageType.ONCE_DAY,
    TicketManageType.ONCE_WEEK,
    TicketManageType.ONCE_MONTH,
    TicketManageType.ONCE_YEAR,
  ]),
  retrieveUserId: z.number(),
  ticketId: z.number(),
});

export type CreateTicketManageInput = z.infer<typeof createTicketManageSchema>;
