import LandingHeader from "../../components/landing/LandingHeader";
import HeroSection from "../../components/landing/HeroSection";
import LandingFooter from "../../components/landing/LandingFooter";

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <LandingHeader />

      
        <HeroSection />

        {/* More landing sections will be added here */}
      

      <LandingFooter />
    </div>
  );
}

export default Landing;