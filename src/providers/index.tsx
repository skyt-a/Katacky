import { PropsWithChildren } from "react";
import SessionProvider from "~/providers/SessionProvider";
import { ThemeProvider } from "~/providers/ThemeProvider";
import { TrpcProvider } from "~/providers/TrpcProvider";

export const GTProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ThemeProvider>
      <TrpcProvider>
        <SessionProvider>{children}</SessionProvider>
      </TrpcProvider>
    </ThemeProvider>
  );
};
