import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import { ThemeProvider } from "./context/ThemeContext";
import AuthProvider from "./context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";


// Create a new instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Routes} />
            <Toaster position="bottom-right" reverseOrder={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
