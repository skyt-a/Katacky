import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../servers";
export const trpc = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      async onSuccess(opts) {
        console.log("onSuccess", opts);
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});
