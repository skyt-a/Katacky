import { TicketManageType } from "@prisma/client";
import { z } from "zod";

export const manageTypeToText = {
  [TicketManageType.ONCE_DAY]: "1日ごと",
  [TicketManageType.ONCE_WEEK]: "1週間ごと",
  [TicketManageType.ONCE_MONTH]: "1ヶ月ごと",
  [TicketManageType.ONCE_YEAR]: "1年ごと",
} as const;

export const ticketFormLength = {
  title: 30,
  message: 150,
  from: 20,
  to: 20,
} as const;

export const passwordSchema = z
  .string()
  .min(8, "パスワードは8文字以上で入力してください")
  .regex(
    /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
    "パスワードは半角英数字混合で入力してください"
  );
