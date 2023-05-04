"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import SuperJSON from "superjson";
import { trpc } from "~/lib/trpc/connectNext";
import { getBaseUrl } from "~/util/api";
import { getIdToken } from "firebase/auth";
import { auth } from "~/lib/firebase/browser";

const getCurrentUserIdToken = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;
  return await getIdToken(currentUser, true);
};

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            suspense: true,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async headers() {
            const idToken = await getCurrentUserIdToken();
            if (!idToken) return {};
            return {
              Authorization: `Bearer ${idToken}`,
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {p.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
