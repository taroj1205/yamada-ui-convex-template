"use client";
import { UIProvider as YamadaUIProvider } from "@yamada-ui/react";
import { defaultConfig, defaultTheme } from "~/theme";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <YamadaUIProvider config={defaultConfig} theme={defaultTheme}>
      {children}
    </YamadaUIProvider>
  );
}
