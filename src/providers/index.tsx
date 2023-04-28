import { PropsWithChildren } from "react";
import { SupabaseProvider } from "~/providers/SessionProvider";
import { TrpcProvider } from "~/providers/TrpcProvider";

export const GTProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <TrpcProvider>
      <SupabaseProvider>{children}</SupabaseProvider>
    </TrpcProvider>
  );
};
