import { PropsWithChildren } from "react";
import SessionProvider from "~/providers/SessionProvider";
import { ThemeProvider } from "~/providers/ThemeProvider";

export const GTProviders = ({ children }: PropsWithChildren<{}>) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};
