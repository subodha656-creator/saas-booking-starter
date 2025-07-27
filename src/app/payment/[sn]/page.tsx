import FAQSection from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import { PricingSection } from "@/components/landing/pricing-section";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SectionWrapper from "@/components/layout/section-wrapper";
import PlanHeroSection from "@/components/payment/plan-hero-section";
import { PricingDetailSection } from "@/components/payment/pricing-detail-section";
import { CheckoutProvider } from "@/context/checkout-context";
import { pricingData } from "@/lib/constants/suscription";
import { createClient } from "@/lib/supabase/supabase-ssr";
import Image from "next/image";

export default async function Home({
  params
}: {
  params: Promise<{
    sn: string
  }>
}) {
   const supabase = await createClient()
const resolvedParams = await params 
   const planType = Object.values(pricingData).flatMap((item: Record<string,any>)=>{
      return item
   }).map((items)=>{
    return {
      sn: items?.sn,
      id: items?.id,
      price: items?.price,
      type: items?.id,
      duration: items?.plan_end === 30 ? "monthly": "yearly"
    }
   }).find((findItem)=>{
      return findItem.sn === resolvedParams?.sn
   })
  

    
 const { data: { user }, error: userError } = await supabase.auth.getUser()
  return (<>
    <PlanHeroSection planType={planType?.type}>
      <Navbar user={user!} accessNavbar={false}/>
      </PlanHeroSection >
    <PricingDetailSection planId={planType?.sn} billingType={planType?.duration as "monthly" | "yearly" | undefined}/>
    <FAQSection/>
    <Footer/>
</>
  );
}
