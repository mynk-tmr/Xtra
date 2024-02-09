import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "@/pages/_layout";
import NotFound from "./404";
import IntroPage from "@/pages/intro";
import LoginPage from "@/pages/login";
import RegistrationForm from "@/pages/login/RegisrationForm";

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
