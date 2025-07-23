import FAQSection from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import Testimonials from "@/components/landing/testimonials";
import Navbar from "@/components/layout/navbar";
import Image from "next/image";

export default function Home() {
  return (<>
    <HeroSection>
      <Navbar/>
    </HeroSection>
    <FeaturesSection />
    <Testimonials/>
    <PricingSection/>
    <FAQSection/>
</>
  );
}
