import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { Web3Provider } from "./context/web3-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Web3Provider>
          <App />
        </Web3Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
