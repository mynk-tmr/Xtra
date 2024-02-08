import {
  HeartIcon,
  HomeIcon,
  MapIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

class NavItem {
  constructor(Icon, title, href) {
    this.icon = <Icon className="size-6 inline-block" />;
    this.title = title;
    this.href = href;
  }
}

export default [
  new NavItem(HomeIcon, "Home", "/home"),
  new NavItem(UserCircleIcon, "Profile", "/profile"),
  new NavItem(MapIcon, "Location Search", "/search/location"),
  new NavItem(HeartIcon, "My Bookings", "/bookings"),
  new NavItem(BuildingOfficeIcon, "My Listings", "/listings"),
];
