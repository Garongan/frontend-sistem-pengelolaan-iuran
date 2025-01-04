import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import Routes from "./routes/Routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <div className="text-zinc-900 bg-zinc-50 min-h-screen">
                <div className="container">
                    <RouterProvider router={Routes} />
                    <Toaster />
                </div>
            </div>
        </QueryClientProvider>
    </React.StrictMode>
);
