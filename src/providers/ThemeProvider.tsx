"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import { PropsWithChildren } from "react";

export type ThemeProviderProps = PropsWithChildren;

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system">
      {children}
    </NextThemeProvider>
  );
};
