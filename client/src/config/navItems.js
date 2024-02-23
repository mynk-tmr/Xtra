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
    ["search?starRating%3Agte=1&offset=0", "Search", MapIcon],
  ],
  loggedin: [
    ["search?starRating%3Agte=1&offset=0", "Search", MapIcon],
    ["profile", "Profile", UserCircleIcon],
    ["mylistings", "My Listings", BuildingOfficeIcon],
    ["mybookings", "My Bookings", HeartIcon],
  ],
};
