import {
  HeartIcon,
  MapIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";

export default {
  anon: [
    ["login", "Sign In", KeyIcon],
    ["search", "Search", MapIcon],
  ],
  loggedin: [
    ["search", "Search", MapIcon],
    ["profile", "Profile", UserCircleIcon],
    ["mylistings", "My Listings", BuildingOfficeIcon],
    ["mybookings", "My Bookings", HeartIcon],
  ],
};
