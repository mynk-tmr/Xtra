import {
  FaceSmileIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";

class Perk {
  constructor(icon, title, feats) {
    this.icon = icon;
    this.title = title;
    this.feats = feats;
  }
}

export default [
  new Perk(<FaceSmileIcon className="text-yellow-400" />, "Convenience", [
    "Full control over storage space",
    "Flexible tenure",
    "Minimal Paperwork",
    "Diverse storage options",
    "No brokerage fees from users",
  ]),
  new Perk(
    <ShieldCheckIcon className="text-blue-500" />,
    "Safe and Transparent",
    [
      "Verified hosts and genuine renters",
      "No security deposit",
      "Identity verification for hosts and renters",
      "Secure payment facilitation",
    ]
  ),
  new Perk(<CreditCardIcon className="text-fuchsia-500" />, "Affordable", [
    "Guaranteed lowest price",
    "More Affordable than other services",
    "Cover both short & long term storage",
  ]),
];
