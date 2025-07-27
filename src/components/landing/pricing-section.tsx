'use client'
import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { pricingAction } from "@/app/server-actions/pricing-action"
import { toast } from "sonner"
import { useContext, useState } from "react"
import LoginModal from "../auth/login-modal"
import { CheckoutContext } from "@/context/checkout-context"
import { pricingData } from "@/lib/constants/suscription"
import { useRouter } from "next/navigation"



function findPlanByPriceAnywhere(price: number) {
  return (
    pricingData.monthly.find(plan => plan.price === price) ||
    pricingData.yearly.find(plan => plan.price === price)
  );
}





export function PricingSection(){
   const [stripeModalOpen, setStripeModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [servicePrice, setServicePrice] = useState<string>("");
  const {setData} = useContext(CheckoutContext);
  const router = useRouter()
  


    return (
      <>

  {
    loginModalOpen &&   <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
  }
      <section id="pricing" className="px-4 sm:px-6 lg:px-8 xl:px-12 py-16 flex justify-center items-center bg-calm-tertiary flex-col">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Button className="bg-calm-primary shadow-lg text-white hover:text-white mb-6">
              Pricing
            </Button>

            <h3 className="text-3xl font-bold text-center mb-4 text-white">
              Save your plans when you pay yearly
            </h3>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include our core features with varying levels of support and customization.
            </p>
          </div>

          <div className="w-full">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="flex justify-center bg-calm-primary items-center space-x-2 mb-8 w-full max-w-md mx-auto">
                <TabsTrigger className="flex-1" value="monthly">Monthly</TabsTrigger>
                <TabsTrigger className="flex-1" value="yearly">Yearly</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-0">
                {pricingData.monthly.map((plan) => (
                  <Card 
                    key={plan.id}
                    style={{
                     
                     background: "linear-gradient(145deg, #82204A 0%, #B64E7A 50%, #82204A 100%)"
                    }}
                    className={`w-full hover:shadow-lg transition-shadow duration-300 ${
                      plan.popular ? 'border-2 border-calm-primary relative' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-calm-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col justify-start items-start p-6 lg:p-8 h-full">
                      <div className="flex-grow w-full">
                        <p className="mb-6 text-xl font-semibold text-white">{plan.name}</p>
                        <div className="mb-8">
                          <h3 className="text-4xl lg:text-5xl font-bold text-white">${plan.price}</h3>
                          <span className="text-sm text-white">{plan.billing}</span>
                        </div>
                        <p className="text-sm font-bold mb-4 text-white">{plan.description}</p>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="before:content-['✔'] before:mr-3 before:text-calm-tertiary before:font-bold text-white">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <input name="price" type="hidden" value={plan?.price} />
                      <input name="plan" type="hidden" value={plan?.name} />

                      <Button onClick={()=>router.push("/payment/"+plan?.sn)} className="w-full bg-calm-primary text-white hover:bg-calm-primary hover:border hover:border-white/100 py-3 text-base font-semibold">
                        Get Started
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="yearly" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-0">
                {pricingData.yearly.map((plan) => (
                  <Card 
                    key={plan.id}
                    style={{
                      background: "linear-gradient(135deg, #82204A 0%, #A94064 50%, #82204A 100%)"
                    }}
                    className={`w-full hover:shadow-lg transition-shadow duration-300 ${
                      plan.popular ? 'border-2 border-calm-primary relative' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-calm-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col justify-start items-start p-6 lg:p-8 h-full">
                      <div className="flex-grow w-full">
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-xl font-semibold text-white">{plan.name}</p>
                          {plan.savings && (
                            <span className="bg-calm-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Save {plan.savings}%
                            </span>
                          )}
                        </div>
                        <div className="mb-8">
                          <h3 className="text-4xl lg:text-5xl font-bold text-white">${plan.price}</h3>
                          <span className="text-sm text-white">{plan.billing}</span>
                          {plan.monthlyEquivalent && (
                            <p className="text-xs text-white mt-1">
                              ${plan.monthlyEquivalent}/month when paid annually
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-bold mb-4 text-white">{plan.description}</p>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="before:content-['✔'] before:mr-3 before:text-calm-tertiary before:font-bold text-white">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <input name="price" type="hidden" value={plan?.price} />
                      <input name="plan" type="hidden" value={plan?.name} />

                      <Button onClick={()=>{
                        router.push("/payment/"+plan?.sn)}
                        } className="w-full bg-calm-primary text-white hover:bg-calm-primary hover:border hover:border-white/100 py-3 text-base font-semibold">
                        Get Started
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      </>
    )
}