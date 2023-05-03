import { PropsWithChildren } from "react";
import { TrpcProvider } from "~/providers/TrpcProvider";

export const GTProviders = ({ children }: PropsWithChildren<{}>) => {
  return <TrpcProvider>{children}</TrpcProvider>;
};
