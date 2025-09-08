"use client";

import Hero from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import UniqueSection from "../components/unquieSection";
import VideoSection from "../components/videoSection";
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <>
            <Hero />
            <UniqueSection />
            <Testimonials />
            <VideoSection />
            <Footer/>
        </>
    );
}
