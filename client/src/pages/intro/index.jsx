import usePageTitle from "@/libs/hooks/usePageTitle";
import { HeroSection } from "./Herosection";
import { PerksSection } from "./PerkSection";

const IntroPage = () => {
  usePageTitle("Xtra | Welcome");
  return (
    <section className="bg-base-100 px-8 md:px-16">
      <HeroSection />
      <PerksSection />
    </section>
  );
};

export default IntroPage;
