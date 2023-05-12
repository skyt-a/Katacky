"use client";

import superjson from "superjson";
import { createHydrateClient } from "~/lib/trpc/client/createHydrateClient";

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});
