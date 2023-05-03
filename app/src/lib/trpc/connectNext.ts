import { transformer } from "./../transform/index";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../servers";
import SuperJSON from "superjson";
export const trpc = createTRPCReact<AppRouter>();
