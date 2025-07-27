import FAQSection from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SectionWrapper from "@/components/layout/section-wrapper";
import { CheckoutProvider } from "@/context/checkout-context";
import { createClient } from "@/lib/supabase/supabase-ssr";
import Image from "next/image";

export default async function Home() {
   const supabase = await createClient()
  
 const { data: { user }, error: userError } = await supabase.auth.getUser()
  return (<>
    <HeroSection>
      <Navbar user={user!} accessNavbar={false}/>
    </HeroSection>
    <FeaturesSection />
    <Testimonials/>
    <PricingSection/>
    <FAQSection/>
    <Footer/>
</>
  );
}
