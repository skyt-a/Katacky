import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../servers";
export const trpc = createTRPCReact<AppRouter>();
