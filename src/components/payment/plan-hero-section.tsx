'use client'
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type PlanType = 'starter' | 'professional' | 'enterprise' | 'payment';

interface PlanContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

const planContent: Record<PlanType, PlanContent> = {
  starter: {
    title: "Find Your Calm.",
    subtitle: "Book Trusted Therapy Sessions in Minutes.",
    description: "CalmClinic connects you with certified therapists, counselors, and wellness experts — all in one simple platform. Choose a plan, book a session, and take control of your mental wellness today.",
    primaryButton: "Get Started",
    secondaryButton: "Explore Services"
  },
  professional: {
    title: "Elevate Your Practice.",
    subtitle: "Advanced Tools for Mental Health Professionals.",
    description: "Join CalmClinic's professional network and access premium features designed for therapists and counselors. Manage clients, schedule sessions, and grow your practice with our comprehensive platform.",
    primaryButton: "Join as Professional",
    secondaryButton: "View Features"
  },
  enterprise: {
    title: "Transform Your Organization.",
    subtitle: "Enterprise Mental Health Solutions at Scale.",
    description: "Empower your workforce with CalmClinic's enterprise platform. Provide comprehensive mental health support to your employees with custom integrations, analytics, and dedicated account management.",
    primaryButton: "Request Demo",
    secondaryButton: "Learn More"
  },
  payment: {
    title: "Simple Pricing.",
    subtitle: "Transparent Plans for Everyone.",
    description: "Choose from our flexible pricing options designed to fit your mental health journey. No hidden fees, no long-term commitments. Pay-as-you-go or save with our monthly plans. Your wellness, your way.",
    primaryButton: "Choose Your Plan",
    secondaryButton: "Compare Plans"
  }
};

export default function PlanHeroSection({
  children,
  planType = 'starter'
}: {
  children?: React.ReactNode;
  planType?: PlanType;
}) {
  const router = useRouter();
  const content = planContent[planType];

  const handlePrimaryAction = () => {
    switch (planType) {
      case 'starter':
        router.push("/signup");
        break;
      case 'professional':
        router.push("/signup");
        break;
      case 'enterprise':
        router.push("/signup");
        break;
      case 'payment':
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  const handleSecondaryAction = () => {
    switch (planType) {
      case 'starter':
        const section = document.getElementById("services");
        section?.scrollIntoView({ behavior: "smooth" });
        break;
      case 'professional':
        const featuresSection = document.getElementById("features");
        featuresSection?.scrollIntoView({ behavior: "smooth" });
        break;
      case 'enterprise':
        const solutionsSection = document.getElementById("solutions");
        solutionsSection?.scrollIntoView({ behavior: "smooth" });
        break;
      case 'payment':
        const plansSection = document.getElementById("plans");
        plansSection?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  return (
   <div
  className="relative min-h-screen bg-gradient-to-r bg-[url('/assets/meditate.jpg')] bg-no-repeat bg-cover from-calm-primary/60 via-calm-primary/80 to-calm-primary/40 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8"
 
>
    <div className="absolute backdrop:2xl:blur-2xl top-0 left-0 w-full h-full bg-black opacity-50">
  </div>
      <div className="absolute top-0 left-0 w-full z-50 px-2 sm:px-4 mb-6 md:mb-0">
        {children}
      </div>

      <div className="absolute lg:block hidden inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-4 sm:left-8 lg:left-16 top-1/4 transform -rotate-45 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 w-48 sm:w-56 lg:w-64 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300">
            <div className="transform rotate-45 hover:rotate-0 transition-transform duration-300">
              <div className="w-10 h-10 bg-calm-primary/80 rounded-full mb-3 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {planType === 'payment' ? (
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
                  ) : (
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  )}
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                {planType === 'payment' ? 'Secure Payment' : 'Certified Therapists'}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {planType === 'payment' 
                  ? 'Safe, encrypted transactions with flexible payment options'
                  : 'Connect with licensed professionals who understand your needs'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="absolute right-4 sm:right-8 lg:right-16 top-2/3 transform rotate-45 hover:rotate-0 transition-transform duration-500 pointer-events-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 w-48 sm:w-56 lg:w-64 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-300">
            <div className="transform -rotate-45 hover:rotate-0 transition-transform duration-300">
              <div className="w-10 h-10 bg-calm-primary/80 rounded-full mb-3 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {planType === 'payment' ? (
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  ) : (
                    <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
                  )}
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                {planType === 'payment' ? 'No Hidden Fees' : 'Instant Booking'}
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {planType === 'payment'
                  ? 'Transparent pricing with no surprise charges or commitments'
                  : 'Schedule sessions in minutes, not days. Available 24/7'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 max-w-7xl mx-auto relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 max-w-4xl mx-auto drop-shadow-lg leading-tight text-white">
          <span className="font-light!">
            {content.title}
          </span> {content.subtitle}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-md leading-relaxed text-white">
          {content.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Button 
            onClick={handlePrimaryAction}
            className="w-full sm:w-auto bg-white hover:bg-calm-primary hover:text-white text-calm-primary font-bold py-4 sm:py-5 md:py-6 px-6 sm:px-7 md:px-8 text-base sm:text-lg rounded-lg shadow-lg transition duration-300"
          >
            {content.primaryButton}
          </Button>
          <Button 
            onClick={handleSecondaryAction}
            className="w-full sm:w-auto border-2 hover:inset-ring-calm-primary text-calm-primary font-semibold py-4 sm:py-5 md:py-6 px-6 sm:px-7 md:px-8 text-base sm:text-lg rounded-lg hover:bg-blue-50 transition duration-300 bg-white/80 backdrop-blur-sm"
          >
            {content.secondaryButton}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce md:hidden">
        <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}