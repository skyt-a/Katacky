"use client";

import superjson from "superjson";
import { createHydrateClient } from "~/lib/trpc/server/HydrateClient";

export const HydrateClient = createHydrateClient({
  transformer: superjson,
});
