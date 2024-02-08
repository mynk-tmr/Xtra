import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/app/layout";
import NotFound from "./404";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
    },
    {
      path: "*",
      Component: NotFound,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
