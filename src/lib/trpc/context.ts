import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  return await createContextInner({});
}
