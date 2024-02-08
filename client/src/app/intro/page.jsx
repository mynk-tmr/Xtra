import React from "react";
import { HeroSection } from "./Herosection";
import { PerksSection } from "./PerkSection";

const IntroPage = () => {
  return (
    <section className="bg-blue-100 px-8 md:px-16">
      <HeroSection />
      <PerksSection />
    </section>
  );
};

export default IntroPage;
