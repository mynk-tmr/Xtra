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
    "Rent on your own terms",
    "Use your own payment options",
    "Diverse storage options",
  ]),
  new Perk(
    <ShieldCheckIcon className="text-blue-500" />,
    "Safe and Transparent",
    [
      "Both parties are verified by our team",
      "Renters can contact only upon verified booking",
      "Constant monitoring of user grievances",
    ]
  ),
  new Perk(<CreditCardIcon className="text-fuchsia-500" />, "Affordable", [
    "Guaranteed lowest price",
    "Search storages as per your budget",
  ]),
];
