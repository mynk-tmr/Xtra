import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "@/app/layout";
import NotFound from "./404";
import IntroPage from "@/app/intro";
import LoginPage from "@/app/login";
import RegistrationForm from "@/app/login/RegisrationForm";

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" Component={RootLayout}>
        <Route index Component={IntroPage} />
        <Route path="login" Component={LoginPage}>
          <Route index Component={RegistrationForm} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
