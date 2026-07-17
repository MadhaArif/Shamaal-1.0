"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Add error handling for missing auth config
  return (
    <SessionProvider 
      refetchInterval={0} // Don't refetch if not needed
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
