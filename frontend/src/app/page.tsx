import Footer from "@/components/homePage/Footer";
import Hero from "@/components/homePage/HeroSection";
import Testimonials from "@/components/homePage/Testimonials";
import UniqueSection from "@/components/homePage/unquieSection";
import VideoSection from "@/components/homePage/videoSection";

export default function HomePage() {
  return (
    <>
    <Hero />
    <UniqueSection />
    <Testimonials />
    <VideoSection />
    <Footer />
    </>
  );
}
