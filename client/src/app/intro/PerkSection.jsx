import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import FeaturesCard from "@/components/FeaturesCard";
import PERKS from "./PERKS";
import Xtralogo from "@/components/Xtralogo";

export const PerksSection = () => {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl mb-12">
        Why do People love <Xtralogo />
      </h1>
      <section className="flex flex-wrap [&>*]:flex-grow gap-x-4 gap-y-8">
        {PERKS.map((perk) => (
          <FeaturesCard
            key={perk.title}
            bigIcon={perk.icon}
            title={perk.title}
            points={perk.feats}
            listIcon={<CheckBadgeIcon className="text-green-500" />}
          />
        ))}
      </section>
    </section>
  );
};
