import { TicketManageType } from "@prisma/client";

export const manageTypeToText = {
  [TicketManageType.ONCE_DAY]: "1日ごと",
  [TicketManageType.ONCE_WEEK]: "1週間ごと",
  [TicketManageType.ONCE_MONTH]: "1ヶ月ごと",
  [TicketManageType.ONCE_YEAR]: "1年ごと",
} as const;
