import { NavButton } from "@/components/NavButton";
import Xtralogo from "@/components/Xtralogo";

export const HeroSection = () => {
  return (
    <section className="min-h-[90vh] grid content-center gap-y-16">
      <h1 className="text-4xl font-bold tracking-tight">
        Turn your <strong className="text-grass">eXTRA SPACE</strong> into{" "}
        <strong className="text-sky">eXTRA CASH</strong>
        <br />
        Or rent storage for your{" "}
        <strong className="text-love">eXTRA items</strong>.
      </h1>
      <p className="max-w-prose font-mono">
        Welcome to <Xtralogo />. Every storage on our platform is verified by
        our team to be <u>safe</u>, <u>affordable</u> and <u>convenient</u>
      </p>
      <nav className="flex gap-6">
        <button className="btn btn-primary" to="/home">
          Browse Storage
        </button>
        <NavButton
          className="bg-sky text-white hover:border-sky hover:text-inherit hover:bg-white"
          to="/login">
          Sign In / Create Account
        </NavButton>
      </nav>
    </section>
  );
};
