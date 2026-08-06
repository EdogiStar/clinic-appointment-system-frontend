import LandingHeader from "../../components/landing/LandingHeader";
import HeroSection from "../../components/landing/HeroSection";
import LandingFooter from "../../components/landing/LandingFooter";

function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingHeader />

      <main>
        <HeroSection />
      </main>

      <LandingFooter />
    </div>
  );
}

export default Landing;