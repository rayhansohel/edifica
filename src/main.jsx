import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes";
import { ThemeProvider } from "./context/ThemeContext";
import AuthProvider from "./context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          {/* Wrap your app with QueryClientProvider */}
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Routes} />
            <ToastContainer
              position="bottom-right"
              hideProgressBar={true}
            />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
