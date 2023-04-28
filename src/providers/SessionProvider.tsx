"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SupabaseClient,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Context = createContext<{ supabase: SupabaseClient } | undefined>(
  undefined
);

export const SupabaseProvider = ({ children }: PropsWithChildren<{}>) => {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    })
  );
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context.supabase;
};
