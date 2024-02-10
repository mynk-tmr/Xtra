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
import ProfilePage from "@/pages/profile";
import LoginForm from "@/pages/login/LoginForm";

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" Component={RootLayout}>
        <Route index Component={IntroPage} />
        <Route path="profile" Component={ProfilePage} />
        <Route path="login" Component={LoginPage}>
          <Route index Component={LoginForm} />
          <Route path="register" Component={RegistrationForm} />
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
