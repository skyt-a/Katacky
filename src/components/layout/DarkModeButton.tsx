"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "~/lib/ui/utils";

export const DarkModeButton = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label="DarkModeToggle"
      type="button"
      className={cn(className, "p-3 h-12 w-12")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (
        <>
          {theme === "dark" ? (
            <Moon height={"25"} width={"25"} />
          ) : (
            <Sun height={"25"} width={"25"} />
          )}
        </>
      )}
    </button>
  );
};
