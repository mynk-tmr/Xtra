import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import FeaturesCard from "@/components/FeaturesCard";
import PERKS from "./PERKS";
import Xtralogo from "@/components/Xtralogo";

export const PerksSection = () => {
  return (
    <section className="prose text-inherit !min-w-full">
      <h1>
        Why do People love <Xtralogo className="ml-4 scale-125" />
      </h1>
      <section className="grid grid-cols-fill gap-8">
        {PERKS.map((perk) => (
          <FeaturesCard
            key={perk.title}
            bigIcon={perk.icon}
            title={perk.title}
            points={perk.feats}
            listIcon={<CheckBadgeIcon className="text-green-600" />}
          />
        ))}
      </section>
    </section>
  );
};
