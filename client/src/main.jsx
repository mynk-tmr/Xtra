import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/lato";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, //switch off auto-retries (3x)
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </React.StrictMode>
);
