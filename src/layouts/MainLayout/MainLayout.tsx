"use client";

import queryClientConfig from "@/config/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientConfig}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
