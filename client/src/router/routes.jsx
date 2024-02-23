import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "@/pages/_layout";
import NotFound from "../pages/404";
import IntroPage from "@/pages/intro";
import LoginPage from "@/pages/login";
import RegistrationForm from "@/pages/login/RegisrationForm";
import ProfilePage from "@/pages/profile";
import LoginForm from "@/pages/login/LoginForm";
import MyListingsLayout from "@/pages/mylistings";
import CreateListingPage from "@/pages/mylistings/create-new/CreateListingPage";
import DisplayListings from "@/pages/mylistings/display";
import AuthRequired from "./AuthRequired";
import EditListingPage from "@/pages/mylistings/EditListingPage";
import OnlyAnonRoute from "./OnlyAnonRoute";
import SearchPage from "@/pages/search";
import BookingsPage from "@/pages/mybookings";
import ListBookings from "@/pages/mybookings/ListBookings";
import AddBookingPage from "@/pages/mybookings/AddBookingPage";

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/" Component={RootLayout}>
        <Route index Component={IntroPage} />
        <Route path="search" Component={SearchPage}></Route>
        <Route Component={OnlyAnonRoute}>
          <Route path="login" Component={LoginPage}>
            <Route index Component={LoginForm} />
            <Route path="register" Component={RegistrationForm} />
          </Route>
        </Route>
        <Route Component={AuthRequired}>
          <Route path="profile" Component={ProfilePage} />
          <Route path="mylistings" Component={MyListingsLayout}>
            <Route index Component={DisplayListings} />
            <Route path="create-new" Component={CreateListingPage} />
            <Route path="edit/:assetId" Component={EditListingPage} />
          </Route>
          <Route path="mybookings" Component={BookingsPage}>
            <Route index Component={ListBookings} />
            <Route path="add" Component={AddBookingPage} />
          </Route>
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
