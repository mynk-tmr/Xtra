import Xtralogo from "@/components/Xtralogo";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="min-h-[90vh] prose grid content-center">
      <h1>
        Turn your <b className="text-primary">eXTRA SPACE</b> into{" "}
        <b className="text-secondary">eXTRA CASH</b>
        <br />
        Or rent storage for your <b className="text-accent">eXTRA items</b>
      </h1>
      <p className="text-black prose-lg">
        Welcome to <Xtralogo />. Every storage on our platform is verified by
        our team to be <b>safe</b>, <b>affordable</b> and <b>convenient</b>
      </p>
      <div className="flex gap-x-6 prose-a:no-underline prose-a:font-bold">
        <Link to="/home">
          <button className="btn btn-primary">Browse Storage</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-secondary">
            Sign In / Create Account
          </button>
        </Link>
      </div>
    </section>
  );
};
