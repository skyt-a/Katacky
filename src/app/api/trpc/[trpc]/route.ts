import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "~/lib/trpc/context";
import { appRouter } from "~/servers";

// this is the server RPC API handler

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};

export const GET = handler;
export const POST = handler;