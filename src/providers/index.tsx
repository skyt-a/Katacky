import { PropsWithChildren } from "react";
import SessionProvider from "~/providers/SessionProvider";
import { TrpcProvider } from "~/providers/TrpcProvider";

export const GTProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <TrpcProvider>
      <SessionProvider>{children}</SessionProvider>
    </TrpcProvider>
  );
};
