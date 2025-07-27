'use client'
import { CheckIcon, ArrowLeftIcon, ShieldIcon, ClockIcon, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useContext, useState } from "react"
import LoginModal from "../auth/login-modal"
import { CheckoutContext } from "@/context/checkout-context"
import { pricingData } from "@/lib/constants/suscription"
import { useRouter } from "next/navigation"
import { pricingAction } from "@/app/server-actions/pricing-action"
import { toast } from "sonner"
import { CheckoutDrawer } from "../checkout/checkout-drawer"

interface PricingDetailSectionProps {
  planId: string;
  billingType?: 'monthly' | 'yearly';
}

function findPlanById(planId: string, billingType: 'monthly' | 'yearly' = 'monthly') {
  return pricingData[billingType].find(plan => plan.sn === planId);
}

export function PricingDetailSection({ planId, billingType = 'monthly' }: PricingDetailSectionProps) {
  const [stripeModalOpen, setStripeModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const { setData } = useContext(CheckoutContext);
  const router = useRouter();
   const [checkoutOpen, setCheckoutOpen] = useState(false);

  const plan = findPlanById(planId, billingType);
  const alternativePlan = findPlanById(planId, billingType === 'monthly' ? 'yearly' : 'monthly');

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-calm-tertiary">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Plan not found</h2>
          <Button onClick={() => router.back()} className="bg-calm-primary">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // const handlePricing = async () => {
  //   const { error, success } = await pricingAction({ price: plan.price });
  //   if (error) {
  //     toast.error(error);
  //     setLoginModalOpen(true);
  //   } else if (success) {
  //     toast.success("Redirecting to payment");
  //     setStripeModalOpen(true);
  //     setData({
  //       plan: plan.name,
  //       price: plan.price
  //     });
  //   }
  // };

  const detailedFeatures = [
    {
      category: "Core Features",
      items: plan.features.slice(0, 3) || []
    },
    {
      category: "Support & Security",
      items: [
        "24/7 Customer Support",
        "End-to-end Encryption",
        "HIPAA Compliant Platform",
        "Secure Payment Processing"
      ]
    },
    {
      category: "Additional Benefits",
      items: plan.features.slice(3) || [
        "Session Recording Available",
        "Progress Tracking Tools",
        "Mobile App Access",
        "Cancel Anytime"
      ]
    }
  ];

    const planType = Object.values(pricingData).flatMap((item: Record<string,any>)=>{
      return item
   }).map((items)=>{
    return {
      sn: items?.sn,
      name: items?.name,
      id: items?.id,
      billing: "",
      price: items?.price,
      features: items?.features
    }
   }).find((findItem)=>{
      return findItem.sn === planId
   })





  return (
    <>
      {/* {stripeModalOpen && (
        <CheckoutModal
          open={stripeModalOpen}
          onClose={() => setStripeModalOpen(false)}
        />
      )} */}
      {loginModalOpen && (
        <LoginModal 
          open={loginModalOpen} 
          onClose={() => setLoginModalOpen(false)} 
        />
      )}
       <CheckoutDrawer
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        planData={planType}
      />

      <section id="pricing" className="min-h-screen bg-calm-tertiary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.back()}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Pricing
            </Button>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-white border-white">
                {billingType === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
              </Badge>
              {plan.popular && (
                <Badge className="bg-calm-primary text-white">
                  Most Popular
                </Badge>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Plan Overview */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">{plan.name}</h1>
                <p className="text-xl text-white/80 mb-6">{plan.description}</p>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-white/60">{plan.billing}</span>
                </div>

                {/* {billingType === 'yearly' && plan?.monthlyEquivalent && (
                  <p className="text-calm-primary font-semibold mb-4">
                    Just ${plan.monthlyEquivalent}/month when paid annually
                  </p>
                )} */}

                {plan.savings && (
                  <div className="bg-calm-primary/20 border border-calm-primary rounded-lg p-4 mb-6">
                    <p className="text-white font-semibold">
                      🎉 Save {plan.savings}% with yearly billing!
                    </p>
                  </div>
                )}
              </div>

              {/* Alternative Billing Option */}
              {alternativePlan && (
                <Card className="bg-white/5 border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold mb-2">
                          Switch to {billingType === 'monthly' ? 'Yearly' : 'Monthly'}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {billingType === 'monthly' 
                            ? `Save ${alternativePlan.savings || 20}% with annual billing`
                            : 'More flexibility with monthly payments'
                          }
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/payment/${planId}?billing=${billingType === 'monthly' ? 'yearly' : 'monthly'}`)}
                        className="text-white border-white hover:bg-white hover:text-calm-tertiary"
                      >
                        ${alternativePlan.price} {alternativePlan.billing}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <ShieldIcon className="w-8 h-8 text-calm-primary mx-auto mb-2" />
                  <p className="text-white/80 text-sm">Secure & Private</p>
                </div>
                <div className="text-center p-4">
                  <ClockIcon className="w-8 h-8 text-calm-primary mx-auto mb-2" />
                  <p className="text-white/80 text-sm">24/7 Support</p>
                </div>
                <div className="text-center p-4">
                  <UsersIcon className="w-8 h-8 text-calm-primary mx-auto mb-2" />
                  <p className="text-white/80 text-sm">Trusted by 10k+</p>
                </div>
              </div>
            </div>

            {/* Features & Checkout */}
            <div className="space-y-8">
              {/* Detailed Features */}
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {detailedFeatures.map((category, idx) => (
                    <div key={idx}>
                      <h4 className="text-white font-semibold mb-3">{category.category}</h4>
                      <ul className="space-y-2">
                        {category.items.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckIcon className="w-5 h-5 text-calm-primary mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {idx < detailedFeatures.length - 1 && <Separator className="mt-4 bg-white/20" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Checkout Section */}
              <Card 
                className="bg-gradient-to-br from-calm-primary to-calm-primary/80 border-0"
              >
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h3>
                    <p className="text-white/90">
                      Join thousands of people improving their mental health with CalmClinic
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      // onClick={handlePricing}
                      onClick={()=> setCheckoutOpen(true)}

                      className="w-full bg-white text-calm-primary hover:bg-white/90 py-4 text-lg font-semibold"
                      size="lg"
                    >
                      Start Your {plan.name} Plan - ${plan.price}
                    </Button>

                    <div className="text-center">
                      <p className="text-white/80 text-sm mb-2">
                        • No long-term commitment • Cancel anytime • 30-day money-back guarantee
                      </p>
                      <p className="text-white/60 text-xs">
                        By continuing, you agree to our Terms of Service and Privacy Policy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Preview */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="text-white/80 cursor-pointer hover:text-white transition-colors">
                      Can I change my plan later?
                    </summary>
                    <p className="text-white/60 text-sm mt-2 pl-4">
                      Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="text-white/80 cursor-pointer hover:text-white transition-colors">
                      What if I'm not satisfied?
                    </summary>
                    <p className="text-white/60 text-sm mt-2 pl-4">
                      We offer a 30-day money-back guarantee. No questions asked.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="text-white/80 cursor-pointer hover:text-white transition-colors">
                      Is my data secure?
                    </summary>
                    <p className="text-white/60 text-sm mt-2 pl-4">
                      Absolutely. We use end-to-end encryption and are HIPAA compliant.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}