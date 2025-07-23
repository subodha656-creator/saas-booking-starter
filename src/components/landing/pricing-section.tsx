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

const pricingData = {
  monthly: [
    {
      id: 'starter',
      name: 'Starter',
      price: 10,
      billing: 'Per user / billed monthly',
      description: 'Ideal for individuals',
      features: [
        '1 user',
        'Email support',
        'Booking calendar',
        'Basic therapy sessions',
        'Progress tracking'
      ],
      popular: false,
      savings: null
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      billing: 'Per user / billed monthly',
      description: 'Best for small teams',
      features: [
        'Up to 5 users',
        'Priority email support',
        'Advanced analytics',
        'Group therapy sessions',
        'Custom wellness plans',
        'Video consultations'
      ],
      popular: true,
      savings: null
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 79,
      billing: 'Per user / billed monthly',
      description: 'For larger organizations',
      features: [
        'Unlimited users',
        'Dedicated support',
        'Custom integrations',
        'White-label solution',
        'Advanced reporting',
        'API access',
        'Custom branding'
      ],
      popular: false,
      savings: null
    }
  ],
  yearly: [
    {
      id: 'starter',
      name: 'Starter',
      price: 100,
      billing: 'Per user / billed yearly',
      monthlyEquivalent: 8.33,
      description: 'Ideal for individuals',
      features: [
        '1 user',
        'Email support',
        'Booking calendar',
        'Basic therapy sessions',
        'Progress tracking',
        '2 months free'
      ],
      popular: false,
      savings: 17
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 290,
      billing: 'Per user / billed yearly',
      monthlyEquivalent: 24.17,
      description: 'Best for small teams',
      features: [
        'Up to 5 users',
        'Priority email support',
        'Advanced analytics',
        'Group therapy sessions',
        'Custom wellness plans',
        'Video consultations',
        '2 months free'
      ],
      popular: true,
      savings: 17
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 790,
      billing: 'Per user / billed yearly',
      monthlyEquivalent: 65.83,
      description: 'For larger organizations',
      features: [
        'Unlimited users',
        'Dedicated support',
        'Custom integrations',
        'White-label solution',
        'Advanced reporting',
        'API access',
        'Custom branding',
        '2 months free'
      ],
      popular: false,
      savings: 17
    }
  ]
};

export function PricingSection(){
    return (
      <section className="px-4 sm:px-6 lg:px-8 xl:px-12 py-16 flex justify-center items-center bg-gray-50 flex-col">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Button className="bg-white shadow-lg text-black hover:text-white mb-6">
              Pricing
            </Button>

            <h3 className="text-3xl font-bold text-center mb-4">
              Save your plans when you pay yearly
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include our core features with varying levels of support and customization.
            </p>
          </div>

          <div className="w-full">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="flex justify-center items-center space-x-2 mb-8 w-full max-w-md mx-auto">
                <TabsTrigger className="flex-1" value="monthly">Monthly</TabsTrigger>
                <TabsTrigger className="flex-1" value="yearly">Yearly</TabsTrigger>
              </TabsList>

              <TabsContent value="monthly" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-0">
                {pricingData.monthly.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`w-full hover:shadow-lg transition-shadow duration-300 ${
                      plan.popular ? 'border-2 border-blue-500 relative' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col justify-start items-start p-6 lg:p-8 h-full">
                      <div className="flex-grow w-full">
                        <p className="mb-6 text-xl font-semibold text-gray-800">{plan.name}</p>
                        <div className="mb-8">
                          <h3 className="text-4xl lg:text-5xl font-bold text-gray-900">${plan.price}</h3>
                          <span className="text-sm text-gray-500">{plan.billing}</span>
                        </div>
                        <p className="text-sm font-bold mb-4 text-gray-700">{plan.description}</p>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="before:content-['✔'] before:mr-3 before:text-green-500 before:font-bold text-gray-600">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 py-3 text-base font-semibold">
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
                    className={`w-full hover:shadow-lg transition-shadow duration-300 ${
                      plan.popular ? 'border-2 border-blue-500 relative' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col justify-start items-start p-6 lg:p-8 h-full">
                      <div className="flex-grow w-full">
                        <div className="flex items-center justify-between mb-6">
                          <p className="text-xl font-semibold text-gray-800">{plan.name}</p>
                          {plan.savings && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                              Save {plan.savings}%
                            </span>
                          )}
                        </div>
                        <div className="mb-8">
                          <h3 className="text-4xl lg:text-5xl font-bold text-gray-900">${plan.price}</h3>
                          <span className="text-sm text-gray-500">{plan.billing}</span>
                          {plan.monthlyEquivalent && (
                            <p className="text-xs text-gray-400 mt-1">
                              ${plan.monthlyEquivalent}/month when paid annually
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-bold mb-4 text-gray-700">{plan.description}</p>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="before:content-['✔'] before:mr-3 before:text-green-500 before:font-bold text-gray-600">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 py-3 text-base font-semibold">
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
    )
}